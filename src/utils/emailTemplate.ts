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
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Monto Total del Proyecto:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">$${formatNum(finanzas.monto)}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Plazo de Financiamiento:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${finanzas.anos} anios</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Abono Inicial (20%):</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">$${formatNum(finanzas.abono)}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Saldo a Financiar:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">$${formatNum(finanzas.restante)}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Recargo (${finanzas.porcentaje_recargo}%):</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">$${formatNum(finanzas.recargo)}</td></tr>
        <tr style="background-color: #f8f9fa;">
          <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #000; border-top: 2px solid #e63946;">Total a Pagar en Cuotas:</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; color: #000; border-top: 2px solid #e63946;">$${formatNum(finanzas.total)}</td>
        </tr>
      </table>

      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #e63946; margin-top: 20px;">
        <h4 style="margin-top:0; color:#2d3748; margin-bottom: 10px;">Opciones de Pago</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; width: 40%;"><strong>Mensual (${finanzas.meses} cuotas):</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">$${formatNum(finanzas.cuota_mensual)} / mes</td></tr>
          <tr><td style="padding: 8px;"><strong>Quincenal (${finanzas.quincenas} cuotas):</strong></td><td style="padding: 8px;">$${formatNum(finanzas.cuota_quincenal)} / quincena</td></tr>
        </table>
      </div>
    `;
  } else {
    detalleFinancieroHTML = `
      <h3 style="color: #E63946; margin-top: 20px; border-bottom: 2px solid #E63946; padding-bottom: 5px;">Detalle del Proyecto Solar</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd; width: 40%;"><strong>Servicio Elegido:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${servicio}</td></tr>
      </table>
      <p style="color: #555; font-size: 14px; font-style: italic;">No aplica para calculo de financiamiento automatico (Servicio personalizado o años no validos).</p>
    `;
  }

  return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1A1A1A; padding: 20px; text-align: center; border-bottom: 4px solid #E63946;">
        <h2 style="color: #ffffff; margin: 0; font-size: 24px;">Vigi-Solar</h2>
        <p style="color: #aaaaaa; margin: 5px 0 0 0; font-size: 14px;">Nueva Solicitud de Cotizacion Web</p>
      </div>
      <div style="padding: 20px; background-color: #ffffff;">
        <p style="font-size: 16px; margin-bottom: 20px;">Has recibido una nueva solicitud de instalacion de paneles solares.</p>
        
        <h3 style="color: #E63946; margin-top: 20px; border-bottom: 2px solid #E63946; padding-bottom: 5px;">Datos del Cliente</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 10px; border-bottom: 1px solid #ddd; width: 40%;"><strong>Nombre:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.nombre}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Cedula / RUC:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.cedula}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Direccion:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.direccion}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Telefono:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${cliente.telefono}</td></tr>
        </table>
        
        ${detalleFinancieroHTML}
      </div>
      <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee;">
        Este correo fue generado automaticamente desde el cotizador web de paneles solares en vigitecpanama.com.
      </div>
    </div>
  `;
}
