export function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`
}

export function formatDateToLocal(date: string) {
  return new Date(date).toLocaleDateString()
}

/**  
 * Genera un objeto { previous, next, pages[] }  
 * con lógica de “first, prev, 3 páginas centrales, next, last”  
 */
export function generatePagination(current: number, total: number) {
  const pages: number[] = []

  for (let i = 1; i <= total; i++) {
    // aquí podrías filtrar para no mostrar **todas** si son muchas
    pages.push(i)
  }

  return {
    previous: current - 1,
    next: current + 1,
    pages,
  }
}
