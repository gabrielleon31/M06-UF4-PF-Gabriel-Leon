// app/dashboard/page.tsx
import { Suspense } from 'react'
import { lusitana } from '@/app/ui/fonts'
import Cards from '@/app/ui/dashboard/cards'
import RevenueChart from '@/app/ui/dashboard/revenue-chart'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import {
  fetchCardData,
  fetchRevenue,
  fetchLatestInvoices,
} from '@/app/lib/data'

export default function Page() {
  // 1️⃣ Lanzamos las promesas sin esperar
  const cardDataPromise       = fetchCardData()
  const revenuePromise        = fetchRevenue()
  const latestInvoicesPromise = fetchLatestInvoices()

  return (
    <main className="p-6 space-y-6">
      <h1 className={`${lusitana.className} text-2xl`}>Dashboard</h1>

      {/* 2️⃣ Stream de las cards */}
      <Suspense fallback={<p>Loading stats…</p>}>
        {/* @ts-expect-error Async Server Component */}
        <Cards promise={cardDataPromise} />
      </Suspense>

      {/* 3️⃣ Stream del gráfico y la lista */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<p>Loading revenue chart…</p>}>
          // @ts-expect-error Async Server Component 
          <RevenueChart promise={revenuePromise} />
        </Suspense>
        <Suspense fallback={<p>Loading latest invoices…</p>}>
          // @ts-expect-error Async Server Component 
          <LatestInvoices promise={latestInvoicesPromise} />
        </Suspense>
      </div>
    </main>
  )
}
