import React from 'react';

import { useLocationDistance, useLocationTracking } from '../providers/location';
import { Box, Button, Paragraph, Title } from '../providers/theme';

export const DistanceScreen: React.FC = () => {
  const tracking = useLocationTracking();
  const distance = useLocationDistance(tracking.locations);

  return (
    <Box variant='page'>
      <Box>
        <Title>Your office marathon</Title>
        {distance === 0 ? (
          <Paragraph>You didn't walk yet, start the location tracking and do your thing.</Paragraph>
        ) : (
          <Paragraph>You walked {distance} meters! Keep it up!</Paragraph>
        )}
      </Box>
      <Box variant='row'>
        {tracking.isTracking ? (
          <Button onPress={tracking.stopTracking}>Stop tracking</Button>
        ) : (
          <Button onPress={tracking.startTracking}>Start tracking</Button>
        )}
        <Button variant='primary' onPress={tracking.clearTracking}>Reset data</Button>
      </Box>
    </Box>
  );
};
