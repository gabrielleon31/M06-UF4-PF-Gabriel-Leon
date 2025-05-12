import postgres from 'postgres';
import { Revenue, LatestInvoice } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue(): Promise<Revenue[]> {
  return sql<Revenue[]>`
    SELECT month, revenue
    FROM revenue
    ORDER BY month
  `;
}

export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  return sql<LatestInvoice[]>`
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
  `;
}

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
    ]);

  return {
    totalPaidInvoices: Number(collected[0]?.sum ?? 0),
    totalPendingInvoices: Number(pending[0]?.sum ?? 0),
    numberOfInvoices: Number(totalInvoices[0]?.count ?? 0),
    numberOfCustomers: Number(totalCustomers[0]?.count ?? 0),
  };
}
