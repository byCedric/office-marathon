import { StackScreenProps } from '@react-navigation/stack';
import { useForegroundPermissions } from 'expo-location';
import React, { useCallback, useEffect } from 'react';

import { StackParamList } from '../providers/navigation';
import { Box, Button, Spinner, Title, Paragraph } from '../providers/theme';

type OnboardingScreenProps = StackScreenProps<StackParamList, 'Onboarding'>;

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [permission, askPermission] = useForegroundPermissions();

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
