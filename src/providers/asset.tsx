import { useFonts, OpenSans_600SemiBold, OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import SplashScreen from 'expo-splash-screen';
import { useEffect, PropsWithChildren } from 'react';

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export function AssetProvider(props: PropsWithChildren) {
  const [isLoaded] = useFonts({
    'open-sans-regular': OpenSans_400Regular,
    'open-sans-semibold': OpenSans_600SemiBold,
  });

  useEffect(() => {
    // Hide the splash screen when the fonts are loaded
    if (isLoaded) SplashScreen.hideAsync();
  }, [isLoaded]);

  return !isLoaded ? null : <>{props.children}</>;
};
