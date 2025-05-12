// app/ui/acme-logo.tsx

import * as React from 'react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { lusitana } from './fonts';

export interface AcmeLogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AcmeLogo({ className = '', ...props }: AcmeLogoProps) {
  return (
    <div
      {...props}
      className={`${lusitana.className} flex items-center leading-none text-white ${className}`}
    >
      <GlobeAltIcon className="h-full w-auto rotate-[15deg]" />
      <p className="text-[44px] ml-2">Acme</p>
    </div>
  )
}
