import { sql } from './connect'
import type { InvoicesTable } from './definitions'

const ITEMS_PER_PAGE = 6

/**
 * Trae un array de facturas filtradas y paginadas,
 * devolviendo exactamente las propiedades que marca InvoicesTable.
 */
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
): Promise<InvoicesTable[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  // rows viene tipado con los campos crudos de la consulta:
  const rows = await sql<{
    id:           string
    amount:       string
    status:       string
    date:         string
    customer_id:  string
    name:         string
    image_url:    string
    email:        string
  }[]>`
    SELECT
      invoices.id,
      invoices.amount,
      invoices.status,
      invoices.date,
      invoices.customer_id,
      customers.name,
      customers.image_url,
      customers.email
    FROM invoices
    JOIN customers
      ON invoices.customer_id = customers.id
    WHERE
      customers.name  ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`}
    ORDER BY invoices.date DESC
    LIMIT  ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `

  // Mapeamos al shape que describe InvoicesTable (ojo: image_url, no imageUrl)
  return rows.map(inv => ({
    id:          inv.id,
    amount:      Number(inv.amount),
    status:      inv.status as 'pending' | 'paid',
    date:        inv.date,
    customer_id: inv.customer_id,
    name:        inv.name,
    email:       inv.email,
    image_url:   inv.image_url,
  }))
}

/**
 * Cuenta cuántas páginas hacen falta según el total de facturas
 * que coincidan con el filtro, usando ITEMS_PER_PAGE.
 */
export async function fetchInvoicesPages(
  query: string,
): Promise<number> {
  const result = await sql<{ count: bigint }[]>`
    SELECT COUNT(*) AS count
      FROM invoices
      JOIN customers
        ON invoices.customer_id = customers.id
     WHERE
       customers.name  ILIKE ${`%${query}%`} OR
       customers.email ILIKE ${`%${query}%`}
  `
  const count = result[0]?.count ?? BigInt(0)
  return Math.ceil(Number(count) / ITEMS_PER_PAGE)
}
