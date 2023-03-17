import { AssetProvider } from './providers/asset';
import { NavigationProvider } from './providers/navigation';
import { ThemeProvider } from './providers/theme';

export function App() {
  return (
    <AssetProvider>
      <ThemeProvider>
        <NavigationProvider />
      </ThemeProvider>
    </AssetProvider>
  );
}
