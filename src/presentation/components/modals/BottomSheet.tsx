import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden='true'
      />

      {/* Sheet */}
      <div
        role='dialog'
        aria-modal='true'
        aria-label={title}
        className={`fixed inset-x-0 bottom-0 z-50 mx-auto max-w-sm transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='rounded-t-2xl bg-white pb-20 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.15)] dark:bg-surface dark:shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.4)]'>
          {/* Drag handle */}
          <div className='flex justify-center pt-3 pb-1'>
            <div className='h-1 w-10 rounded-full bg-finance-slate/30 dark:bg-text-secondary/30' />
          </div>

          {/* Header */}
          <div className='flex items-center justify-between px-5 pb-3'>
            <h2 className='text-base font-semibold text-finance-navy dark:text-text'>
              {title}
            </h2>
            <button
              type='button'
              onClick={onClose}
              className='flex h-8 w-8 items-center justify-center rounded-full text-finance-slate transition-colors hover:bg-finance-mist dark:text-text-secondary dark:hover:bg-background'
            >
              <X className='h-4 w-4' />
            </button>
          </div>

          {/* Content */}
          <div className='max-h-[60vh] overflow-y-auto px-5 pb-5'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
