import { LocationObject } from 'expo-location';
import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

import { Box, Button, Paragraph, Title } from '../providers/theme';
import { useLocationData, useLocationDistance, useLocationTracking } from '../services/location';

export function DistanceScreen() {
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
}

type DistanceLocationListProps = {
  locations: LocationObject[];
}

function DistanceLocationList({ locations }: DistanceLocationListProps) {
  const listRef = useRef<FlatList<LocationObject>>(null);

  useEffect(() => {
    // don't ask... if we call it directly,
    // the list scrolls to the "previous" end instead of the "new" end
    if (locations.length) {
      setTimeout(() => listRef.current?.scrollToEnd());
    }
  }, [locations.length]);

  return (
    <Box>
      <FlatList
        ref={listRef}
        style={{ flexGrow: 0, flexBasis: 200 }}
        data={locations}
        keyExtractor={(location, index) => `${location.timestamp}-${index}`}
        renderItem={entry => (
          <DistanceLocation
            number={entry.index}
            location={entry.item}
          />
        )}
      />
    </Box>
  );
};

type DistanceLocationProps = {
  number: number;
  location: LocationObject;
}

function DistanceLocation(props: DistanceLocationProps) {
  return (
    <Box variant='row'>
      <Paragraph>#{props.number + 1}</Paragraph>
      <Paragraph>lat: {props.location.coords.latitude}</Paragraph>
      <Paragraph>lng: {props.location.coords.longitude}</Paragraph>
    </Box>
  );
}
