import { lusitana } from '@/app/ui/fonts';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from '@/app/lib/data';

export default async function Page() {
  const [revenue, latestInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  return (
    <main className="p-6">
      <h1 className={`${lusitana.className} mb-6 text-2xl`}>Dashboard</h1>

      {/* Cartas con estadísticas */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={cardData.totalPaidInvoices} type="collected" />
        <Card title="Pending"   value={cardData.totalPendingInvoices} type="pending" />
        <Card title="Total Invoices"  value={cardData.numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={cardData.numberOfCustomers} type="customers" />
      </div>

      {/* Gráfico y últimas facturas */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
