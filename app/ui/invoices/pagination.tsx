'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx                               from 'clsx'
import Link                               from 'next/link'
import { usePathname, useSearchParams }  from 'next/navigation'
import { generatePagination }            from '@/app/lib/utils'

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname    = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const pages = generatePagination(currentPage, totalPages)

  return (
    <nav className="inline-flex items-center space-x-2">
      <Link
        href={createPageURL(pages.previous)}
        className={clsx('p-2 rounded', {
          'text-gray-400': pages.previous < 1
        })}
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </Link>
      {pages.pages.map((p) => (
        <Link
          key={p}
          href={createPageURL(p)}
          className={clsx('px-3 py-1 rounded', {
            'bg-blue-500 text-white': p === currentPage,
            'bg-gray-200': p !== currentPage,
          })}
        >
          {p}
        </Link>
      ))}
      <Link
        href={createPageURL(pages.next)}
        className={clsx('p-2 rounded', {
          'text-gray-400': pages.next > totalPages
        })}
      >
        <ArrowRightIcon className="h-5 w-5" />
      </Link>
    </nav>
  )
}
