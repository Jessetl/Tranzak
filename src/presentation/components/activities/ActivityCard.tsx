import React from 'react';
import {
  Car,
  UtensilsCrossed,
  TrendingUp,
  Home,
  Gamepad2,
  Heart,
  ShoppingBag,
  Wifi,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Activity, ActivityCategory } from '@/presentation/mocks/recentActivities';

const categoryConfig: Record<
  ActivityCategory,
  { icon: React.ElementType; bg: string; text: string }
> = {
  Transporte: { icon: Car, bg: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-500' },
  Comida: { icon: UtensilsCrossed, bg: 'bg-orange-100 dark:bg-orange-500/20', text: 'text-orange-500' },
  Ingreso: { icon: TrendingUp, bg: 'bg-emerald-100 dark:bg-emerald-500/20', text: 'text-finance-emerald' },
  Hogar: { icon: Home, bg: 'bg-purple-100 dark:bg-purple-500/20', text: 'text-purple-500' },
  Entretenimiento: { icon: Gamepad2, bg: 'bg-pink-100 dark:bg-pink-500/20', text: 'text-pink-500' },
  Salud: { icon: Heart, bg: 'bg-red-100 dark:bg-red-500/20', text: 'text-red-500' },
  Compras: { icon: ShoppingBag, bg: 'bg-yellow-100 dark:bg-yellow-500/20', text: 'text-yellow-600' },
  Servicios: { icon: Wifi, bg: 'bg-cyan-100 dark:bg-cyan-500/20', text: 'text-cyan-500' },
};

function formatDate(date: Date): string {
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

interface ActivityCardProps {
  activity: Activity;
  className?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, className }) => {
  const config = categoryConfig[activity.category];
  const Icon = config.icon;
  const isExpense = activity.type === 'expense';

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 dark:bg-surface',
        className,
      )}
    >
      {/* Category icon */}
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
          config.bg,
        )}
      >
        <Icon className={cn('h-[18px] w-[18px]', config.text)} />
      </div>

      {/* Name & category */}
      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm font-semibold text-finance-navy dark:text-text'>
          {activity.name}
        </p>
        <p className='text-xs text-finance-slate dark:text-text-secondary'>
          {activity.category}
        </p>
      </div>

      {/* Amount & date */}
      <div className='shrink-0 text-right'>
        <p
          className={cn(
            'text-sm font-semibold',
            isExpense ? 'text-error' : 'text-finance-emerald',
          )}
        >
          {isExpense ? '-' : '+'}${activity.amount.toFixed(2)}
        </p>
        <p className='text-xs text-finance-slate dark:text-text-secondary'>
          {formatDate(activity.date)}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
