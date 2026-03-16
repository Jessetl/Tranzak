import React from 'react';
import { Outlet } from 'react-router-dom';
import AppShellFooter from '@/presentation/components/shells/AppShell/AppShellFooter';

const AuthenticatedLayout = (): React.JSX.Element => {
  return (
    <>
      <Outlet />
      <AppShellFooter />
    </>
  );
};

export default AuthenticatedLayout;
