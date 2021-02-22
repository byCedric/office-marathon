import { useNavigation } from '@react-navigation/native';
import { LOCATION, usePermissions } from 'expo-permissions';
import React, { useCallback, useEffect } from 'react';

import { Box, Button, Spinner, Title, Paragraph } from '../providers/theme';

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [permission, askPermission] = usePermissions(LOCATION);

  const permScopeAlways = permission?.permissions.location.scope == "always"; 

  const onContinue = useCallback(() => {
    navigation.navigate('Distance');
  }, [navigation]);

  useEffect(() => {
    // Only redirect on first render or permission change,
    // not when users go back to this screen.
    if (permission?.granted && permScopeAlways) {
      onContinue();
    }
  }, [permission?.granted, permScopeAlways]);

  if (permission?.granted && permScopeAlways) {
    return (
      <Box variant='page'>
        <Box>
          <Title>Permissions granted</Title>
          <Paragraph>To monitor your office marathon, we need access to background location.</Paragraph>
        </Box>
        <Button onPress={onContinue}>Let's start!</Button>
      </Box>
    );
  }

  return (
    <Box variant='page'>
      <Box>
        <Title>We need your permission</Title>
        <Paragraph>To monitor your office marathon, we need access to background location. Please select ALWAYS ALLOW location services in your settings.</Paragraph>
      </Box>
      {!permission
        ? <Spinner />
        : <Button onPress={askPermission}>Grant permission</Button>
      }
      
      {permission?.granted && !permScopeAlways &&
          <Paragraph>You have only granted permission to use your location when the app is in use. Please ALWAYS ALLOW location services in your settings.</Paragraph>
        }
    </Box>
  );
};
