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
      <h3 style="color: #E63946; margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Detalle del Proyecto</h3>
      <ul style="list-style-type: none; padding: 0; font-size: 15px;">
        <li style="margin-bottom: 8px;"><strong>Kit Solar:</strong> ${servicio}</li>
        <li style="margin-bottom: 8px;"><strong>Costo Estimado:</strong> $${formatNum(finanzas.monto)}</li>
        <li style="margin-bottom: 8px;"><strong>Plazo:</strong> ${finanzas.anos} a&ntilde;os</li>
        <li style="margin-bottom: 8px;"><strong>Abono (20%):</strong> $${formatNum(finanzas.abono)}</li>
        <li style="margin-bottom: 8px;"><strong>Saldo Restante:</strong> $${formatNum(finanzas.restante)}</li>
        <li style="margin-bottom: 8px;"><strong>Recargo (${finanzas.porcentaje_recargo}%):</strong> $${formatNum(finanzas.recargo)}</li>
      </ul>
      <div style="background-color: #f9f9f9; padding: 12px; margin-top: 15px; border-left: 4px solid #E63946;">
        <strong style="color: #1A1A1A; font-size: 16px;">Total Final: $${formatNum(finanzas.total)}</strong>
      </div>

      <h4 style="color: #1A1A1A; margin-top: 20px; margin-bottom: 10px;">Proyecci&oacute;n de Cuotas</h4>
      <ul style="list-style-type: none; padding: 0; font-size: 15px;">
        <li style="margin-bottom: 8px;"><strong>Mensual (${finanzas.meses} meses):</strong> $${formatNum(finanzas.cuota_mensual)}</li>
        <li style="margin-bottom: 8px;"><strong>Quincenal (${finanzas.quincenas} quincenas):</strong> $${formatNum(finanzas.cuota_quincenal)}</li>
      </ul>
    `;
  } else {
    detalleFinancieroHTML = `
      <h3 style="color: #E63946; margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Detalle del Proyecto</h3>
      <ul style="list-style-type: none; padding: 0; font-size: 15px;">
        <li style="margin-bottom: 8px;"><strong>Servicio Elegido:</strong> ${servicio}</li>
      </ul>
      <p style="color: #777; font-size: 14px; font-style: italic;">Sin proyecci&oacute;n num&eacute;rica (Servicio personalizado).</p>
    `;
  }

  return `
<div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #333333;">
  <div style="background-color: #1A1A1A; padding: 20px; border-bottom: 4px solid #E63946; text-align: center;">
    <h2 style="color: #ffffff; margin: 0;">Vigi-Solar</h2>
    <p style="color: #cccccc; margin: 5px 0 0 0; font-size: 14px;">Solicitud de Cotizaci&oacute;n Web</p>
  </div>
  
  <div style="padding: 20px; border: 1px solid #eeeeee; border-top: none;">
    <h3 style="color: #E63946; margin-top: 0;">Datos del Cliente</h3>
    <ul style="list-style-type: none; padding: 0; font-size: 16px;">
      <li style="margin-bottom: 10px;"><strong>Nombre:</strong> ${cliente.nombre}</li>
      <li style="margin-bottom: 10px;"><strong>C&eacute;dula/RUC:</strong> ${cliente.cedula}</li>
      <li style="margin-bottom: 10px;"><strong>Tel&eacute;fono:</strong> ${cliente.telefono}</li>
      <li style="margin-bottom: 10px;"><strong>Direcci&oacute;n:</strong> ${cliente.direccion}</li>
    </ul>
    
    ${detalleFinancieroHTML}
  </div>
  
  <div style="text-align: center; padding: 15px; color: #999999; font-size: 12px;">
    Enviado autom&aacute;ticamente desde vigitecpanama.com
  </div>
</div>
  `.trim();
}

export function generarTemplateContacto(cliente: DatosCliente, servicio: string, detalles: string) {
  return `
<div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #333333;">
  <div style="background-color: #1A1A1A; padding: 20px; border-bottom: 4px solid #E63946; text-align: center;">
    <h2 style="color: #ffffff; margin: 0;">Vigitec Panama</h2>
    <p style="color: #cccccc; margin: 5px 0 0 0; font-size: 14px;">Nueva Solicitud de Cotizaci&oacute;n</p>
  </div>
  
  <div style="padding: 20px; border: 1px solid #eeeeee; border-top: none;">
    <h3 style="color: #E63946; margin-top: 0;">Datos del Solicitante</h3>
    <ul style="list-style-type: none; padding: 0; font-size: 16px;">
      <li style="margin-bottom: 10px;"><strong>Nombre:</strong> ${cliente.nombre}</li>
      <li style="margin-bottom: 10px;"><strong>Tel&eacute;fono:</strong> ${cliente.telefono}</li>
      <li style="margin-bottom: 10px;"><strong>Servicio:</strong> ${servicio}</li>
    </ul>
    
    <h3 style="color: #E63946; margin-top: 20px;">Detalles Adicionales</h3>
    <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #E63946; font-size: 15px;">
      ${detalles || 'Sin detalles proporcionados'}
    </p>
  </div>
  
  <div style="text-align: center; padding: 15px; color: #999999; font-size: 12px;">
    Enviado autom&aacute;ticamente desde el formulario de vigitecpanama.com
  </div>
</div>
  `.trim();
}
