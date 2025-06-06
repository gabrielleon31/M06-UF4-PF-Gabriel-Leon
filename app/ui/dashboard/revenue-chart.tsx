import { generateYAxis, generateRevenueStats } from '@/app/lib/utils'
import { CalendarIcon }                         from '@heroicons/react/24/outline'
import { lusitana }                             from '@/app/ui/fonts'
import { Revenue }                              from '@/app/lib/definitions'

export default async function RevenueChart({
  promise,
}: {
  promise: Promise<Revenue[]>
}) {
  const revenue = await promise

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>
  }

  const chartHeight = 350

  // → Extraemos solo los valores numéricos
  const stats        = generateRevenueStats(revenue)    // number[]
  const { yAxisLabels, topLabel } = generateYAxis(stats)

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl`}>Recent Revenue</h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {/* Eje Y */}
          <div
            className="hidden sm:flex flex-col justify-between text-sm text-gray-400"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {/* Barras */}
          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              />
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>

        {/* Pie del gráfico */}
        <div className="flex items-center gap-2 pt-6 pb-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
      </div>
    </div>
  )
}
