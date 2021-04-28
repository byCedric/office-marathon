import { useNavigation } from '@react-navigation/native';
import { LOCATION_FOREGROUND, usePermissions } from 'expo-permissions';
import React, { useCallback, useEffect } from 'react';

import { Box, Button, Spinner, Title, Paragraph } from '../providers/theme';

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [permission, askPermission] = usePermissions(LOCATION_FOREGROUND);

  const onContinue = useCallback(() => {
    navigation.navigate('Distance');
  }, [navigation]);

  useEffect(() => {
    // Only redirect on first render or permission change,
    // not when users go back to this screen.
    if (permission?.granted) {
      onContinue();
    }
  }, [permission?.granted]);

  if (permission?.granted) {
    return (
      <Box variant='page'>
        <Box>
          <Title>Permissions granted</Title>
          <Paragraph>To monitor your office marathon, we need access to your location.</Paragraph>
        </Box>
        <Button onPress={onContinue}>Let's start!</Button>
      </Box>
    );
  }

  return (
    <Box variant='page'>
      <Box>
        <Title>We need your permission</Title>
        <Paragraph>To monitor your office marathon, we need access to your location.</Paragraph>
      </Box>
      {!permission
        ? <Spinner />
        : <Button onPress={askPermission}>Grant permission</Button>
      }
    </Box>
  );
};
