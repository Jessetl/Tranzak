import React, { useState, useMemo } from 'react';
import { Search, Building2, ChevronRight, Check } from 'lucide-react';
import {
  BANKS,
  CURRENCIES,
  type CreateWalletDTO,
} from '@/domain/entities/Wallet';

interface CreateWalletFormProps {
  onSubmit: (dto: CreateWalletDTO) => void;
}

const CreateWalletForm: React.FC<CreateWalletFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [bank, setBank] = useState('');
  const [currency, setCurrency] = useState<string>('USD');
  const [bankSearch, setBankSearch] = useState('');
  const [showBankList, setShowBankList] = useState(false);

  const selectedBank = BANKS.find((b) => b.id === bank);

  const filteredBanks = useMemo(() => {
    if (!bankSearch.trim()) return BANKS;
    const q = bankSearch.toLowerCase();
    return BANKS.filter((b) => b.name.toLowerCase().includes(q));
  }, [bankSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !bank) return;
    onSubmit({ name: name.trim(), currency, bank: selectedBank?.name ?? bank });
    setName('');
    setBank('');
    setCurrency('USD');
    setBankSearch('');
    setShowBankList(false);
  };

  const isValid = name.trim().length > 0 && bank.length > 0;

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {/* Nombre */}
      <div>
        <label className='mb-1 block text-xs font-medium text-finance-slate dark:text-text-secondary'>
          Nombre de la billetera
        </label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Ej: Cuenta principal'
          className='w-full rounded-xl border border-finance-mist bg-white px-3 py-2.5 text-sm text-finance-navy outline-none transition-colors focus:border-finance-emerald dark:border-surface dark:bg-background dark:text-text dark:focus:border-finance-emerald-light'
        />
      </div>

      {/* Banco */}
      <div>
        <label className='mb-1 block text-xs font-medium text-finance-slate dark:text-text-secondary'>
          Banco o plataforma
        </label>
        {!showBankList ? (
          <button
            type='button'
            onClick={() => setShowBankList(true)}
            className='flex w-full items-center justify-between rounded-xl border border-finance-mist bg-white px-3 py-2.5 text-sm transition-colors hover:border-finance-emerald dark:border-surface dark:bg-background dark:hover:border-finance-emerald-light'
          >
            <span
              className={
                selectedBank
                  ? 'text-finance-navy dark:text-text'
                  : 'text-finance-slate/50 dark:text-text-secondary/50'
              }
            >
              {selectedBank ? selectedBank.name : 'Seleccionar banco'}
            </span>
            <ChevronRight className='h-4 w-4 text-finance-slate dark:text-text-secondary' />
          </button>
        ) : (
          <div className='rounded-xl border border-finance-emerald bg-white dark:border-finance-emerald-light dark:bg-background'>
            <div className='flex items-center gap-2 border-b border-finance-mist px-3 py-2 dark:border-surface'>
              <Search className='h-4 w-4 text-finance-slate dark:text-text-secondary' />
              <input
                type='text'
                value={bankSearch}
                onChange={(e) => setBankSearch(e.target.value)}
                placeholder='Buscar banco...'
                autoFocus
                className='flex-1 bg-transparent text-sm text-finance-navy outline-none placeholder:text-finance-slate/50 dark:text-text dark:placeholder:text-text-secondary/50'
              />
            </div>
            <div className='max-h-40 overflow-y-auto'>
              {filteredBanks.map((b) => (
                <button
                  key={b.id}
                  type='button'
                  onClick={() => {
                    setBank(b.id);
                    setShowBankList(false);
                    setBankSearch('');
                  }}
                  className='flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-finance-mist/50 dark:hover:bg-surface/50'
                >
                  <Building2 className='h-4 w-4 shrink-0 text-finance-slate dark:text-text-secondary' />
                  <span className='flex-1 text-finance-navy dark:text-text'>
                    {b.name}
                  </span>
                  <span className='text-[10px] text-finance-slate/60 dark:text-text-secondary/60'>
                    {b.country === 'VE'
                      ? '🇻🇪'
                      : b.country === 'US'
                        ? '🇺🇸'
                        : '🌐'}
                  </span>
                  {bank === b.id && (
                    <Check className='h-4 w-4 text-finance-emerald' />
                  )}
                </button>
              ))}
              {filteredBanks.length === 0 && (
                <p className='px-3 py-4 text-center text-xs text-finance-slate dark:text-text-secondary'>
                  No se encontraron resultados
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Moneda */}
      <div>
        <label className='mb-1 block text-xs font-medium text-finance-slate dark:text-text-secondary'>
          Moneda
        </label>
        <div className='flex gap-2'>
          {CURRENCIES.map((c) => (
            <button
              key={c}
              type='button'
              onClick={() => setCurrency(c)}
              className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                currency === c
                  ? 'border-finance-emerald bg-finance-emerald/10 text-finance-emerald dark:border-finance-emerald-light dark:bg-finance-emerald-light/10 dark:text-finance-emerald-light'
                  : 'border-finance-mist bg-white text-finance-slate hover:border-finance-emerald/50 dark:border-surface dark:bg-background dark:text-text-secondary dark:hover:border-finance-emerald-light/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type='submit'
        disabled={!isValid}
        className='w-full rounded-xl bg-finance-emerald py-3 text-sm font-semibold text-white shadow-[0_4px_16px_-2px_rgba(16,185,129,0.5)] transition-all hover:bg-finance-emerald-dark active:scale-[0.98] disabled:opacity-40 disabled:shadow-none dark:shadow-[0_4px_16px_-2px_rgba(52,211,153,0.4)]'
      >
        Crear billetera
      </button>
    </form>
  );
};

export default CreateWalletForm;
