// app/lib/data.ts

import { sql } from './connect'
import type { LatestInvoice, InvoicesTable } from './definitions'

/**
 * Capítulo 7: Stub temporal para que tus componentes de dashboard compilen.
 * (En capítulos posteriores lo sustituirás por la consulta real).
 */
export async function fetchCardData(): Promise<{ label: string; value: number }[]> {
  return []
}

export async function fetchRevenue(): Promise<number[]> {
  return []
}

export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  return []
}

/**
 * Capítulo 11: Search & Pagination para /dashboard/invoices
 */
const ITEMS_PER_PAGE = 6

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
): Promise<InvoicesTable[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

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

export async function fetchInvoicesPages(query: string): Promise<number> {
  const result = await sql<{ count: bigint }[]>`
    SELECT
      COUNT(*) AS count
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
