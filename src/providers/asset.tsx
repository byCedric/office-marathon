import React from 'react';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  OpenSans_600SemiBold,
  OpenSans_400Regular,
} from '@expo-google-fonts/open-sans';

export const AssetProvider: React.FC = (props) => {
  const [isLoaded] = useFonts({
    'open-sans-regular': OpenSans_400Regular,
    'open-sans-semibold': OpenSans_600SemiBold,
  });

  return isLoaded
    ? <>{props.children}</>
    : <AppLoading />;
};
