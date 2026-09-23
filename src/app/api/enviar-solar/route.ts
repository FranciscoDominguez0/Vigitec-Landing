import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { calcularFinanciamiento } from '@/utils/financiamiento';
import { generarTemplateCorreo } from '@/utils/emailTemplate';

export async function POST(req: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ success: false, message: 'Error de configuración del servidor de correos.' });
    }

    const resend = new Resend(resendApiKey);
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY || '';
    
    const body = await req.json();

    const cliente = {
      nombre: (body.Nombre || '').trim(),
      cedula: (body['Cédula'] || '').trim(),
      telefono: (body['Teléfono'] || '').trim(),
      direccion: (body['Dirección'] || '').trim()
    };
    
    const servicio = (body.Servicio || '').trim();
    const anos = parseInt(body.Anos || '0', 10);
    const recaptchaResponse = body['g-recaptcha-response'] || '';

    if (!recaptchaResponse) {
      return NextResponse.json({ success: false, message: 'Por favor, marque la casilla de "No soy un robot".' });
    }

    // Verificar reCAPTCHA
    if (recaptchaSecretKey) {
      const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
      const verifyResponse = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: recaptchaSecretKey,
          response: recaptchaResponse
        })
      });
      const verifyData = await verifyResponse.json();
      if (!verifyData.success) {
        return NextResponse.json({ success: false, message: 'Verificación de seguridad fallida. Inténtelo de nuevo.' });
      }
    }

    const finanzas = calcularFinanciamiento(servicio, anos);
    const htmlMensaje = generarTemplateCorreo(cliente, servicio, finanzas);
    
    const correoDestino = process.env.SMTP_DESTINATION || 'info@vigitecpanama.com';
    const asunto = 'NUEVA SOLICITUD DE COTIZACIÓN - Vigi-Solar';

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: correoDestino,
      subject: asunto,
      html: htmlMensaje
    });

    if (result.error) {
      console.error(result.error);
      return NextResponse.json({ success: false, message: 'Error al enviar a través de Resend. Inténtelo más tarde.' });
    }

    return NextResponse.json({ success: true, message: '' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Ha ocurrido un error inesperado. Inténtelo más tarde.' });
  }
}
