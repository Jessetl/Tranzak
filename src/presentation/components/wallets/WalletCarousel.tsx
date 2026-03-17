import React, { useState, useCallback } from 'react';
import { Wallet as WalletIcon } from 'lucide-react';
import type { Wallet } from '@/domain/entities/Wallet';

interface WalletCarouselProps {
  wallets: Wallet[];
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const WalletCarousel: React.FC<WalletCarouselProps> = ({ wallets }) => {
  const [current, setCurrent] = useState(0);
  const [dragState, setDragState] = useState({ startX: 0, isDragging: false });
  const [dragOffset, setDragOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(300);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, wallets.length - 1));
      setCurrent(clamped);
      setDragOffset(0);
    },
    [wallets.length],
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragState({
      startX: e.clientX,
      isDragging: true,
    });
    setContainerWidth(e.currentTarget.clientWidth || 300);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.isDragging) return;
    const diff = e.clientX - dragState.startX;
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (!dragState.isDragging) return;
    setDragState((prev) => ({ ...prev, isDragging: false }));
    const threshold = 50;
    if (dragOffset < -threshold) {
      goTo(current + 1);
    } else if (dragOffset > threshold) {
      goTo(current - 1);
    } else {
      setDragOffset(0);
    }
  };

  const translateX = -(current * 100) + (dragOffset / containerWidth) * 100;

  return (
    <div className='select-none'>
      <div
        className='overflow-hidden rounded-2xl'
        style={{ touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className='flex'
          style={{
            transform: `translateX(${translateX}%)`,
            transition: dragState.isDragging
              ? 'none'
              : 'transform 300ms ease-out',
          }}
        >
          {wallets.map((wallet) => (
            <article
              key={wallet.id}
              className={`w-full flex-shrink-0 rounded-2xl bg-gradient-to-br ${wallet.gradient} p-5 shadow-lg`}
            >
              <div className='flex items-center justify-between'>
                <div className='flex h-9 w-9 items-center justify-center rounded-full bg-white/20'>
                  <WalletIcon className='h-4 w-4 text-white' />
                </div>
                <span className='rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white'>
                  {wallet.currency}
                </span>
              </div>

              <p className='mt-4 text-xs font-medium text-white/70'>
                {wallet.name}
              </p>

              <p className='mt-1 text-2xl font-bold text-white'>
                ${formatNumber(wallet.balanceUSD)}
              </p>
              <p className='text-sm font-medium text-white/60'>
                Bs. {formatNumber(wallet.balanceVES)}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className='mt-3 flex items-center justify-center gap-1.5'>
        {wallets.map((w, i) => (
          <button
            key={w.id}
            type='button'
            aria-label={`Ir a ${w.name}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-5 bg-finance-emerald'
                : 'w-1.5 bg-finance-slate/30 dark:bg-text-secondary/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default WalletCarousel;
