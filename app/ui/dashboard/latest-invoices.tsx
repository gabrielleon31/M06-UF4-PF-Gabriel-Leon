import { ArrowPathIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { lusitana } from '@/app/ui/fonts'
import { LatestInvoice } from '@/app/lib/definitions'

export default async function LatestInvoices({
  promise,
}: {
  promise: Promise<LatestInvoice[]>
}) {
  const items = await promise

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl`}>Latest Invoices</h2>
      <div className="flex flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {items.map((invoice, i) => (
            <div
              key={invoice.id}
              className={clsx(
                'flex items-center justify-between py-4',
                { 'border-t': i !== 0 }
              )}
            >
              <div className="flex items-center">
                <Image
                  src={invoice.image_url}
                  alt={`${invoice.name}'s profile`}
                  width={32}
                  height={32}
                  className="mr-4 rounded-full"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {invoice.name}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:block">
                    {invoice.email}
                  </p>
                </div>
              </div>
              <p
                className={`${lusitana.className} truncate text-sm font-medium`}
              >
                {invoice.amount}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-6 pb-2">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  )
}
