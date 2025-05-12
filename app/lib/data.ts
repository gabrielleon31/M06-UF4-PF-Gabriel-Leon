import postgres from 'postgres'
import {
  Revenue,
  LatestInvoice,
  LatestInvoiceRaw,
  InvoicesTable,
  // CustomerField,
  // InvoiceForm,
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
    totalPaidInvoices: Number(collected[0]?.sum ?? 0),
    totalPendingInvoices: Number(pending[0]?.sum ?? 0),
    numberOfInvoices:      Number(totalInvoices[0]?.count ?? 0),
    numberOfCustomers:     Number(totalCustomers[0]?.count ?? 0),
  }
}

/** ➤ RevenueChart: ingresos mensuales */
export async function fetchRevenue(): Promise<Revenue[]> {
  return sql<Revenue[]>`
    SELECT month, revenue
      FROM revenue
     ORDER BY month
  `
}

/** ➤ LatestInvoices: últimas 5 facturas, con amount formateado */
export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  // obtenemos la data cruda con amount numérico
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
  // devolvemos LatestInvoice (amount: string) pasándolo por formatCurrency
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
