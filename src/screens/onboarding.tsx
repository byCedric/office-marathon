import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LOCATION, usePermissions } from 'expo-permissions';

import { Box, Button, Title, Paragraph } from '../providers/theme';
import { ActivityIndicator,  } from 'dripsy';

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [permission, askPermission] = usePermissions(LOCATION);

  useEffect(() => {
    if (permission?.granted) {
      navigation.navigate('Distance');
    }
  }, [permission?.granted]);

  return (
    <Box variant='page'>
      <Box>
        <Title>We need your permission</Title>
        <Paragraph>To monitor your office marathon, we need access to background location.</Paragraph>
      </Box>
      {!permission
        ? <ActivityIndicator color="#333" />
        : <Button onPress={askPermission}>Grant permission</Button>
      }
    </Box>
  );
};
