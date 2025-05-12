'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  HomeIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const links = [
  { name: 'Home',      href: '/dashboard',           icon: HomeIcon },
  { name: 'Invoices',  href: '/dashboard/invoices',  icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          href={href}
          className={clsx(
            // clases base
            'flex h-[48px] items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium \
             hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
            // clases de activo
            {
              'bg-sky-100 text-blue-600': pathname === href,
            }
          )}
        >
          <Icon className="w-6" />
          <span className="hidden md:block">{name}</span>
        </Link>
      ))}
    </>
  );
}
