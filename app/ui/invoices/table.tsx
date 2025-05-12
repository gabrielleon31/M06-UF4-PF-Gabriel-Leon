import InvoiceStatus from './status'
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils'
import { fetchFilteredInvoices } from '@/app/lib/data'

export interface InvoicesTable {
  id: string
  amount: number
  name: string
  email: string
  status: string
  date: string
}

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage)

  return (
    <table className="w-full table-auto border-separate border-spacing-y-2">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Date</th>
          <th>Status</th>
          <th className="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((inv) => (
          <tr key={inv.id} className="bg-white">
            <td className="py-2">
              <div className="text-sm font-medium">{inv.name}</div>
              <div className="text-xs text-gray-500">{inv.email}</div>
            </td>
            <td>{formatDateToLocal(inv.date)}</td>
            <td>
              <InvoiceStatus status={inv.status} />
            </td>
            <td className="text-right">{formatCurrency(inv.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
