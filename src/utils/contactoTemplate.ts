import { DatosCliente } from "./emailTemplate";

export function generarTemplateContacto(cliente: DatosCliente, servicio: string, detalles: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Vigitec Panama - Nueva Solicitud</title>
</head>
<body>
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #1A1A1A; padding: 20px; text-align: center; border-bottom: 4px solid #E63946;">
      <h2 style="color: #ffffff; margin: 0; font-size: 24px;">Vigitec Panama</h2>
      <p style="color: #aaaaaa; margin: 5px 0 0 0; font-size: 14px;">Nueva Solicitud de Cotizaci&oacute;n</p>
    </div>
    <div style="padding: 20px; background-color: #ffffff;">
      <p style="font-size: 16px; margin-bottom: 20px;">Has recibido una nueva solicitud de cotizaci&oacute;n desde la web.</p>
      
      <h3 style="color: #E63946; margin-top: 20px; border-bottom: 2px solid #E63946; padding-bottom: 5px;">Datos del Solicitante</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd; width: 40%;"><strong>Nombre:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.nombre}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Tel&eacute;fono:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.telefono}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Servicio de Inter&eacute;s:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${servicio}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Detalles:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${detalles || 'Sin detalles'}</td></tr>
      </table>
    </div>
    <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee;">
      Este correo fue generado autom&aacute;ticamente desde vigitecpanama.com.
    </div>
  </div>
</body>
</html>`;
}
