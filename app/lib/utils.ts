/**
 * Da formato monetario a un número
 */
export function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`
}

/**
 * Da formato de fecha local a una ISO string
 */
export function formatDateToLocal(date: string) {
  return new Date(date).toLocaleDateString()
}

/**
 * Genera un objeto { previous, next, pages[] }
 * para paginación simple
 */
export function generatePagination(current: number, total: number) {
  const pages: number[] = []
  for (let i = 1; i <= total; i++) {
    pages.push(i)
  }
  return {
    previous: current - 1,
    next:     current + 1,
    pages,
  }
}

/**
 * Extrae solo la parte numérica de los datos de revenue
 */
export function generateRevenueStats(data: { revenue: number }[]): number[] {
  return data.map((r) => r.revenue)
}

/**
 * A partir de un array de números, devuelve:
 *  - yAxisLabels: 5 valores equiespaciados [0, ¼ max, ½ max, ¾ max, max]
 *  - topLabel: valor máximo
 */
export function generateYAxis(data: number[]): {
  yAxisLabels: number[]
  topLabel:    number
} {
  const max = data.length > 0 ? Math.max(...data) : 0
  const labels = [
    0,
    +(max * 0.25).toFixed(2),
    +(max * 0.5).toFixed(2),
    +(max * 0.75).toFixed(2),
    max,
  ]
  return {
    yAxisLabels: labels,
    topLabel:    max,
  }
}
