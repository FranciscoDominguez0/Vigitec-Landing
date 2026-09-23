export interface DatosFinanciamiento {
  monto: number;
  anos: number;
  abono: number;
  restante: number;
  porcentaje_recargo: number;
  recargo: number;
  total: number;
  meses: number;
  quincenas: number;
  cuota_mensual: number;
  cuota_quincenal: number;
}

export function calcularFinanciamiento(servicio: string, anos: number): DatosFinanciamiento | null {
  const preciosKits: Record<string, number> = {
    'Kit 1 (4.96 kWp)': 4607.28,
    'Kit 2 (7.44 kWp)': 6100.09,
    'Kit 3 (9.92 kWp)': 7684.59,
    'Kit 4 (12.40 kWp)': 9745.60,
    'Kit 5 (14.88 kWp)': 11174.65
  };
  
  const monto = preciosKits[servicio] || 0;
  
  if (monto <= 0 || anos <= 0) {
    return null;
  }
  
  const abono = monto * 0.20;
  const restante = monto - abono;
  const porcentaje_recargo = 10 * anos; 
  const recargo = restante * (porcentaje_recargo / 100);
  const total = restante + recargo;
  
  return {
    monto,
    anos,
    abono,
    restante,
    porcentaje_recargo,
    recargo,
    total,
    meses: anos * 12,
    quincenas: anos * 24,
    cuota_mensual: total / (anos * 12),
    cuota_quincenal: total / (anos * 24)
  };
}
