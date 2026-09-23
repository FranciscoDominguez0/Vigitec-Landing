import { DatosFinanciamiento } from "./financiamiento";

export interface DatosCliente {
  nombre: string;
  cedula: string;
  direccion: string;
  telefono: string;
}

export function generarTemplateCorreo(cliente: DatosCliente, servicio: string, finanzas: DatosFinanciamiento | null) {
  let detalleFinancieroHTML = '';

  if (finanzas) {
    const formatNum = (num: number) => Number(num).toFixed(2);
    
    detalleFinancieroHTML = `
      <h3 style="color: #E63946; margin-top: 20px; border-bottom: 2px solid #E63946; padding-bottom: 5px;">Detalle del Proyecto Solar</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd; width: 40%;"><strong>Kit Solar Elegido:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${servicio}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Costo Estimado:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${formatNum(finanzas.monto)} USD</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Plazo Solicitado:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${finanzas.anos} a&ntilde;os</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Abono (20%):</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${formatNum(finanzas.abono)} USD</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Saldo Restante:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${formatNum(finanzas.restante)} USD</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Recargo (${finanzas.porcentaje_recargo}%):</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${formatNum(finanzas.recargo)} USD</td></tr>
        <tr style="background-color: #f8f9fa;">
          <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #000; border-top: 2px solid #e63946;">Total Final:</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #000; border-top: 2px solid #e63946;">${formatNum(finanzas.total)} USD</td>
        </tr>
      </table>

      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #e63946; margin-top: 20px;">
        <h4 style="margin-top:0; color:#2d3748; margin-bottom: 10px;">Proyecci&oacute;n de Cuotas</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; width: 40%;"><strong>Mensual (${finanzas.meses} meses):</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formatNum(finanzas.cuota_mensual)} USD / mes</td></tr>
          <tr><td style="padding: 8px;"><strong>Quincenal (${finanzas.quincenas} quincenas):</strong></td><td style="padding: 8px;">${formatNum(finanzas.cuota_quincenal)} USD / quin</td></tr>
        </table>
      </div>
    `;
  } else {
    detalleFinancieroHTML = `
      <h3 style="color: #E63946; margin-top: 20px; border-bottom: 2px solid #E63946; padding-bottom: 5px;">Detalle del Proyecto Solar</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd; width: 40%;"><strong>Servicio Elegido:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${servicio}</td></tr>
      </table>
      <p style="color: #555; font-size: 14px; font-style: italic;">Sin proyecci&oacute;n num&eacute;rica (Servicio personalizado).</p>
    `;
  }

  return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1A1A1A; padding: 20px; text-align: center; border-bottom: 4px solid #E63946;">
        <h2 style="color: #ffffff; margin: 0; font-size: 24px;">Vigi-Solar</h2>
        <p style="color: #aaaaaa; margin: 5px 0 0 0; font-size: 14px;">Nueva Solicitud de Cotizaci&oacute;n Web</p>
      </div>
      <div style="padding: 20px; background-color: #ffffff;">
        <p style="font-size: 16px; margin-bottom: 20px;">Has recibido una nueva solicitud de instalaci&oacute;n de paneles solares.</p>
        
        <h3 style="color: #E63946; margin-top: 20px; border-bottom: 2px solid #E63946; padding-bottom: 5px;">Datos del Cliente</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 10px; border-bottom: 1px solid #ddd; width: 40%;"><strong>Nombre:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.nombre}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>C&eacute;dula / RUC:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.cedula}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Direcci&oacute;n:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.direccion}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Tel&eacute;fono:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.telefono}</td></tr>
        </table>
        
        ${detalleFinancieroHTML}
      </div>
      <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee;">
        Este correo fue generado autom&aacute;ticamente desde el cotizador web de paneles solares en vigitecpanama.com.
      </div>
    </div>
  `;
}

export function generarTemplateContacto(cliente: DatosCliente, servicio: string, detalles: string) {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1A1A1A; padding: 20px; text-align: center; border-bottom: 4px solid #E63946;">
        <h2 style="color: #ffffff; margin: 0; font-size: 24px;">Vigi-Solar</h2>
        <p style="color: #aaaaaa; margin: 5px 0 0 0; font-size: 14px;">Nuevo Mensaje de Contacto</p>
      </div>
      <div style="padding: 20px; background-color: #ffffff;">
        <p style="font-size: 16px; margin-bottom: 20px;">Has recibido una nueva solicitud desde la p&aacute;gina web.</p>
        
        <h3 style="color: #E63946; margin-top: 20px; border-bottom: 2px solid #E63946; padding-bottom: 5px;">Datos del Cliente</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 10px; border-bottom: 1px solid #ddd; width: 40%;"><strong>Nombre:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.nombre}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Tel&eacute;fono:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.telefono}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.cedula}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Servicio:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">
            <span style="background-color: #1A1A1A; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${servicio}</span>
          </td></tr>
        </table>
        
        <h3 style="color: #E63946; margin-top: 20px; border-bottom: 2px solid #E63946; padding-bottom: 5px;">Mensaje / Detalles</h3>
        <div style="background-color: #f8f9fa; padding: 15px; border: 1px solid #eee; border-radius: 4px; font-style: italic; color: #555;">
          ${detalles ? detalles.replace(/\n/g, '<br>') : 'Sin detalles adicionales'}
        </div>
      </div>
      <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee;">
        Este correo fue generado autom&aacute;ticamente desde el sitio web.
      </div>
    </div>
  `;
}
