// app/lib/data.ts

import postgres from 'postgres'
import {
  Revenue,
  LatestInvoiceRaw,
  LatestInvoice,
  InvoicesTable,
} from './definitions'
import { formatCurrency } from './utils'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

/** ➤ Cards: datos agregados de la tabla invoices/customers */
export async function fetchCardData() {
  const [collected, pending, totalInvoices, totalCustomers] =
    await Promise.all([
      sql<{ sum: bigint }[]>`
        SELECT SUM(amount) AS sum FROM invoices WHERE status = 'paid'
      `,
      sql<{ sum: bigint }[]>`
        SELECT SUM(amount) AS sum FROM invoices WHERE status = 'pending'
      `,
      sql<{ count: bigint }[]>`
        SELECT COUNT(*) AS count FROM invoices
      `,
      sql<{ count: bigint }[]>`
        SELECT COUNT(*) AS count FROM customers
      `,
    ])

  return {
    totalPaidInvoices:   Number(collected[0]?.sum ?? 0),
    totalPendingInvoices: Number(pending[0]?.sum ?? 0),
    numberOfInvoices:     Number(totalInvoices[0]?.count ?? 0),
    numberOfCustomers:    Number(totalCustomers[0]?.count ?? 0),
  }
}

/** ➤ RevenueChart: ingresos mensuales (simula delay de 3s) */
export async function fetchRevenue(): Promise<Revenue[]> {
  console.log('Fetching revenue data...')  
  await new Promise((res) => setTimeout(res, 3000))
  const data = await sql<Revenue[]>`
    SELECT month, revenue
      FROM revenue
     ORDER BY month
  `
  console.log('Data fetch completed after 3 seconds.')
  return data
}

/** ➤ LatestInvoices: últimas 5 facturas, con amount formateado */
export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  const rows = await sql<LatestInvoiceRaw[]>`
    SELECT
      invoices.id,
      invoices.amount,
      customers.name,
      customers.image_url,
      customers.email
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5
  `
  return rows.map((inv) => ({
    ...inv,
    amount: formatCurrency(inv.amount),
  }))
}

/**
 * STUB TEMPORAL hasta Capítulo 8
 * Permite que la tabla de facturas compile,
 * pero de momento devuelve siempre un array vacío.
 */
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
): Promise<InvoicesTable[]> {
  return []
}