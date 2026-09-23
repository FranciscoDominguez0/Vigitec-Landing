import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #E63946; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px;">Vigitec Panama</h2>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p style="font-size: 16px; margin-bottom: 20px;">Has recibido un nuevo mensaje de contacto.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; width: 30%;"><strong>Nombre:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${Nombre}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Telefono:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${Telefono}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${Email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Servicio:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <span style="background-color: #1A1A1A; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${Servicio}</span>
              </td>
            </tr>
          </table>

          <h3 style="color: #E63946; margin-top: 20px; margin-bottom: 10px;">Mensaje / Detalles:</h3>
          <div style="background-color: #ffffff; padding: 15px; border: 1px solid #eee; border-radius: 4px; font-style: italic; color: #555;">
            ${Detalles ? Detalles.replace(/\n/g, '<br>') : 'Sin detalles'}
          </div>
        </div>
        <div style="background-color: #1A1A1A; padding: 15px; text-align: center; font-size: 12px; color: #aaa;">
          Notificacion automatica del sitio web.
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: 'Vigitec Web <onboarding@resend.dev>',
      to: destination,
      subject: 'Vigitec - Nuevo Mensaje de Contacto',
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