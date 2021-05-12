import { LocationObject } from 'expo-location';
import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { Box, Button, Paragraph, Title } from '../providers/theme';
import { useLocationData, useLocationDistance, useLocationTracking } from '../services/location';
import { getProfile } from "../services/profile";

export const DistanceScreen: React.FC = () => {
  const locations = useLocationData();
  const tracking = useLocationTracking();
  const distance = useLocationDistance(locations);

  return (
    <Box variant='page'>
      <Box>
        <Title>Your Travel Diary</Title>
        {distance === 0
          ? <Paragraph>You didn't walk yet, start the location tracking and start walking.</Paragraph>
          : <Paragraph>You walked {distance} meters! Keep it up!</Paragraph>
        }
        <UserProfile userID={1} />

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

  useEffect(() => {
    // don't ask... if we call it directly,
    // the list scrolls to the "previous" end instead of the "new" end
    setTimeout(() => listRef.current?.scrollToEnd())
  }, [props.locations.length]);

  return (
    <Box>
      <FlatList
        ref={listRef}
        style={{ flexGrow: 0, flexBasis: 200 }}
        data={props.locations}
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

const DistanceLocation: React.FC<{ number: number, location: LocationObject }> = (props) => (
  <Box variant='row'>
    <Paragraph>#{props.number + 1}</Paragraph>
    <Paragraph>lat: {props.location.coords.latitude}</Paragraph>
    <Paragraph>lng: {props.location.coords.longitude}</Paragraph>
    {/* <Paragraph>time: {props.location.timestamp}</Paragraph> */} 
  </Box>
);


const UserProfile: React.FC<{userID: number}> = (props) => {
  const profile:any = getProfile(props.userID); 


  let current = new Date();
  let cDay = current.getDate();
  let cMonth = current.getMonth()+1;
  let cYear = current.getFullYear();
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  let cDate = cDay + "/" + cMonth + "/" + cYear;

  const diaryStart = new Date(2021, 2, 26, 3, 0, 0)
  const diaryEnd = new Date(2021, 2, 27, 2, 59, 59)

  return (
    <Box>
      <Title>Your Profile</Title>
      <Paragraph>Assigned Diary Date:</Paragraph>
      <Box variant="row">
        <Paragraph>Start: </Paragraph>
        <Paragraph>{diaryStart.toDateString()} at {diaryStart.toLocaleTimeString()}</Paragraph>
      </Box>
      <Box variant="row">
        <Paragraph>End: </Paragraph>
        <Paragraph>{diaryEnd.toDateString()} at {diaryStart.toLocaleTimeString()}</Paragraph>
      </Box>
      <Paragraph>Current Date: { current.toDateString() }</Paragraph>
      <Paragraph>Current Time: { current.toLocaleTimeString()}</Paragraph>

      {/* <Paragraph>{JSON.stringify(profile)}</Paragraph> */}
      <Paragraph>Name: {JSON.stringify(profile.name)}</Paragraph>
      <Paragraph>Email: {JSON.stringify(profile.email)}</Paragraph>
    </Box>
  );
};

// const fetchUser = async () => {
//   try {
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//     const {name, email } = await response.json();
//   } catch(error) {}
// };