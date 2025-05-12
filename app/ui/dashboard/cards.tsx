import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

const iconMap = {
  collected: BanknotesIcon,
  pending:   ClockIcon,
  invoices:  InboxIcon,
  customers: UserGroupIcon,
};

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'collected' | 'pending' | 'invoices' | 'customers';
}) {
  const Icon = iconMap[type];
  return (
    <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
      <div className="flex items-center">
        {Icon && <Icon className="h-6 w-6 text-gray-700" />}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} mt-4 truncate rounded-xl bg-white
                    px-4 py-6 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
