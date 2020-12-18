import React from 'react';
// import { StatusBar } from 'expo-status-bar';

import { AssetProvider } from './providers/asset';
import { NavigationProvider } from './providers/navigation';
import { ThemeProvider } from './providers/theme';

export const App: React.FC = () => (
  <AssetProvider>
    <ThemeProvider>
      <NavigationProvider />
    </ThemeProvider>
  </AssetProvider>
);
{/* <StatusBar style="auto" /> */}
