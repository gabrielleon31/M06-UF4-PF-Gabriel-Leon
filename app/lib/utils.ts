// app/lib/utils.ts

export function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`
}

export function formatDateToLocal(date: string) {
  return new Date(date).toLocaleDateString()
}

/**  
 * Genera un objeto { previous, next, pages[] }  
 * con lógica de “first, prev, pages… next, last”  
 */
export function generatePagination(current: number, total: number) {
  const pages: number[] = []
  for (let i = 1; i <= total; i++) pages.push(i)
  return {
    previous: current - 1,
    next:     current + 1,
    pages,
  }
}

/**
 * Dado un array de valores numéricos (revenue),
 * devuelve los cuatro ticks de la Y: 0, ¼ max, ½ max, ¾ max, max
 */
export function generateYAxis(data: number[]): number[] {
  const max = data.length > 0 ? Math.max(...data) : 0
  return [
    0,
    +(max * 0.25).toFixed(2),
    +(max * 0.5).toFixed(2),
    +(max * 0.75).toFixed(2),
    max,
  ]
}

/**
 * A partir de un array de ingresos, devuelve solo los valores
 * para pintarlos como barras (sin etiquetas)
 */
export function generateRevenueStats(data: number[]): number[] {
  return data
}
