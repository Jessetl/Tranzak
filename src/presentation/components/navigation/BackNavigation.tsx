import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const MAIN_ROUTES = ['/', '/statistics', '/wallet', '/profile'];

const BackNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't render on dashboard (home)
  if (location.pathname === '/') return null;

  const handleBack = () => {
    // Navigate to the previous route in the main routes stack
    // If browser history has entries, go back; otherwise go home
    // We never want to go back to /login
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Find the label based on parent route
  const getBackLabel = (): string => {
    const idx = MAIN_ROUTES.indexOf(location.pathname);
    if (idx > 0) return 'Atrás';
    return 'Atrás';
  };

  return (
    <button
      type='button'
      onClick={handleBack}
      className='inline-flex items-center gap-0.5 text-sm font-medium text-white/80 transition-colors hover:text-white dark:text-text-secondary dark:hover:text-text'
    >
      <ChevronLeft className='h-4 w-4' />
      {getBackLabel()}
    </button>
  );
};

export default BackNavigation;
