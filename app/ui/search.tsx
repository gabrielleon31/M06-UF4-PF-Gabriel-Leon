'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname     = usePathname()
  const { replace }  = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching… ${term}`)
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', '1')          // reset al cambiar búsqueda
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] px-10 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query') ?? ''}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <MagnifyingGlassIcon
        className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-blue-500"
        aria-hidden
      />
    </div>
  )
}
