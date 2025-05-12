import {
  BanknotesIcon,
  ClockIcon,
  InboxIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { lusitana } from '@/app/ui/fonts'
import { fetchCardData } from '@/app/lib/data'

const iconMap = {
  collected: BanknotesIcon,
  pending:   ClockIcon,
  invoices:  InboxIcon,
  customers: UserGroupIcon,
} as const

type CardType = keyof typeof iconMap

/** Presentational: una sola carta */
export function Card({
  title,
  value,
  type,
}: {
  title: string
  value: number | string
  type: CardType
}) {
  const Icon = iconMap[type]
  return (
    <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
      <div className="flex items-center">
        <Icon className="h-6 w-6 text-gray-700" />
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} mt-4 truncate rounded-xl bg-white
                    px-4 py-6 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  )
}

/** Wrapper Server Component: consume la promesa y muestra las 4 cartas */
export default async function Cards({
  promise,
}: {
  promise: Promise<ReturnType<typeof fetchCardData>>
}) {
  const cardData = await promise

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card
        title="Collected"
        value={cardData.totalPaidInvoices}
        type="collected"
      />
      <Card
        title="Pending"
        value={cardData.totalPendingInvoices}
        type="pending"
      />
      <Card
        title="Total Invoices"
        value={cardData.numberOfInvoices}
        type="invoices"
      />
      <Card
        title="Total Customers"
        value={cardData.numberOfCustomers}
        type="customers"
      />
    </div>
  )
}
