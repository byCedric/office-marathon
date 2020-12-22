import { LocationObject } from 'expo-location';
import React, { useRef } from 'react';
import { FlatList } from 'react-native';

import { Box, Button, Paragraph, Title } from '../providers/theme';
import { useLocationData, useLocationDistance, useLocationTracking } from '../services/location';

export const DistanceScreen: React.FC = () => {
  const locations = useLocationData();
  const tracking = useLocationTracking();
  const distance = useLocationDistance(locations);

  return (
    <Box variant='page'>
      <Box>
        <Title>Your office marathon</Title>
        {distance === 0
          ? <Paragraph>You didn't walk yet, start the location tracking and start walking.</Paragraph>
          : <Paragraph>You walked {distance} meters! Keep it up!</Paragraph>
        }
      </Box>
      <Box variant='row'>
        {tracking.isTracking
          ? <Button onPress={tracking.stopTracking}>Stop tracking</Button>
          : <Button onPress={tracking.startTracking}>Start tracking</Button>
        }
        <Button variant='primary' onPress={tracking.clearTracking}>Reset data</Button>
      </Box>
      <DistanceLocationList locations={locations} />
    </Box>
  );
};

const DistanceLocationList: React.FC<{ locations: LocationObject[] }> = (props) => {
  const listRef = useRef<FlatList<LocationObject>>(null);

  return (
    <Box>
      <FlatList
        style={{ flexGrow: 0, flexBasis: 200 }}
        ref={listRef}
        data={props.locations}
        keyExtractor={(location, index) => `${location.timestamp}-${index}`}
        renderItem={entry => (
          <DistanceLocation
            number={entry.index}
            location={entry.item}
          />
        )}
        // keep scrolling to bottom when new data is displayed
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      />
    </Box>
  );
};

const DistanceLocation: React.FC<{ number: number, location: LocationObject }> = (props) => (
  <Box variant='row'>
    <Paragraph>#{props.number}</Paragraph>
    <Paragraph>lat: {props.location.coords.latitude}</Paragraph>
    <Paragraph>lng: {props.location.coords.longitude}</Paragraph>
  </Box>
);
