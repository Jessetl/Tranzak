import { ThemeProvider } from './presentation/providers/ThemeProvider';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { WalletProvider } from './presentation/providers/WalletProvider';
import AppShell from './presentation/components/shells/AppShell';

function App() {
  return (
    <ThemeProvider defaultTheme='light'>
      <AuthProvider>
        <WalletProvider>
          <AppShell />
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
