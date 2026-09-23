import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generarTemplateContacto, DatosCliente } from '@/utils/emailTemplate';

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ success: false, message: 'Error de configuracion' }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);

    const body = await request.json();
    const Nombre = (body.Nombre || body.nombre || '').trim();
    const Telefono = (body.Telefono || body.telefono || body['Teléfono'] || body['TelǸfono'] || '').trim();
    const Email = (body.Email || body.email || '').trim();
    const Servicio = (body.Servicio || body.servicio || '').trim();
    const Detalles = (body.Detalles || body.detalles || '').trim();
    const recaptchaResponse = body.recaptchaResponse || '';

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!recaptchaResponse) {
      return NextResponse.json({ success: false, message: 'Falta validar el reCAPTCHA.' }, { status: 400 });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;
    
    const recaptchaRes = await fetch(verifyUrl, { method: 'POST' });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return NextResponse.json({ success: false, message: 'Fallo la verificacion de reCAPTCHA.' }, { status: 400 });
    }

    const destination = process.env.SMTP_DESTINATION || 'dominguezf225@gmail.com';

    const cliente: DatosCliente = {
      nombre: Nombre,
      telefono: Telefono,
      cedula: '', // No incluir email en el cuerpo del correo (dispara filtros anti-phishing)
      direccion: ''
    };

    const emailHtml = generarTemplateContacto(cliente, Servicio, Detalles);

    const emailResponse = await resend.emails.send({
      from: 'Vigitec Web <onboarding@resend.dev>',
      to: destination,
      subject: 'Vigitec - Nueva Solicitud de Cotizacion',
      html: emailHtml
    });

    if (emailResponse.error) {
      console.error('Error de Resend:', emailResponse.error);
      return NextResponse.json({ success: false, message: 'Error enviando el correo.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Cotizacion enviada exitosamente.' });
  } catch (error) {
    console.error('Error general en la API:', error);
    return NextResponse.json({ success: false, message: 'Error interno del servidor.' }, { status: 500 });
  }
}