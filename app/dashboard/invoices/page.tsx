import Pagination                from '@/app/ui/invoices/pagination'
import Search                    from '@/app/ui/search'
import Table                     from '@/app/ui/invoices/table'
import { CreateInvoice }         from '@/app/ui/invoices/buttons'
import { lusitana }              from '@/app/ui/fonts'
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'
import { Suspense }              from 'react'
import {
  fetchFilteredInvoices,
  fetchInvoicesPages,
} from '@/app/lib/data'

export default async function Page({
  searchParams,
}: {
  // Next.js te pasa directamente un objeto searchParams
  searchParams?: { query?: string; page?: string }
}) {
  // Extraemos y parseamos
  const query       = searchParams?.query ?? ''
  const currentPage = Number(searchParams?.page ?? '1') || 1

  // Calculamos totalPages según el query
  const totalPages = await fetchInvoicesPages(query)

  return (
    <div className="w-full">
      {/* CABECERA */}
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>

      {/* SEARCH + BOTÓN */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense fallback={null}>
          {/* Search es Client Component */}
          <Search placeholder="Search invoices..." />
        </Suspense>
        <CreateInvoice />
      </div>

      {/* TABLA */}
      <Suspense
        key={query + currentPage}
        fallback={<InvoicesTableSkeleton />}
      >
        <Table
          query={query}
          currentPage={currentPage}
        />
      </Suspense>

      {/* PAGINACIÓN */}
      <div className="mt-5 flex w-full justify-center">
        <Suspense fallback={null}>
          {/* Pagination es Client Component */}
          <Pagination totalPages={totalPages} />
        </Suspense>
      </div>
    </div>
  )
}
