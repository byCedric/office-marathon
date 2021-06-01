import API, { graphqlOperation } from '@aws-amplify/api';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { createLocation } from '../../graphql/mutations';
import { getUserId } from '../profile/authentication';



/**
 * The unique name of the background location task.
 */
export const locationTaskName = 'office-marathon';

/**
 * Check if the background location is started and running.
 * This is a wrapper around `Location.hasStartedLocationUpdatesAsync` with the task name prefilled.
 */
export async function isTracking(): Promise<boolean> {
    return await Location.hasStartedLocationUpdatesAsync(locationTaskName);
}

/**
 * Start the background location monitoring and add new locations to the storage.
 * This is a wrapper around `Location.startLocationUpdatesAsync` with the task name prefilled.
 */
export async function startTracking() {
  await Location.startLocationUpdatesAsync(locationTaskName, {
    accuracy: Location.Accuracy.BestForNavigation,
    distanceInterval: 5,
    //android behavior
    timeInterval: 10 * 1000,
    foregroundService: {
      notificationTitle: 'Travel Diary is active',
      notificationBody: 'Monitoring your location to measure total distance',
      notificationColor: '#333333',
    },
    // ios behavior
    activityType: Location.ActivityType.Other,
    showsBackgroundLocationIndicator: true,
    pausesUpdatesAutomatically: true,
  });
  console.log('[tracking]', 'started background location task');
}

/**
 * Stop the background location monitoring.
 * This is a wrapper around `Location.stopLocationUpdatesAsync` with the task name prefilled.
 */
export async function stopTracking() {
  await Location.stopLocationUpdatesAsync(locationTaskName);
  console.log('[tracking]', 'stopped background location task');
}

/**
 * Define the background task that's adding locations to the storage.
 * This method isn't "directly" connected to React, that's why we store the data locally.
 */
// TaskManager.defineTask(locationTaskName, async (event) => {
//   if (event.error) {
//     return console.error('[tracking]', 'Something went wrong within the background location task...', event.error);
//   }

//   const locations = (event.data as any).locations as Location.LocationObject[];
//   console.log('[tracking]', 'Received new locations', locations);

//   try {
//     // have to add it sequentially, parses/serializes existing JSON
//     for (const location of locations) {
//       await addLocation(location);
//     }
//   } catch (error) {
//     console.log('[tracking]', 'Something went wrong when saving a new location...', error);
//   }
// });

TaskManager.defineTask(locationTaskName, async (event) => {
  if (event.error) {
    return console.error('[tracking]', 'Something went wrong within the background location task...', event.error);
  }

  const locations = (event.data as any).locations as Location.LocationObject[];
  const userID = await getUserId();

  console.log('[tracking]', 'Received new locations', locations);

  try {
    for (const location of locations) {
      const newLocation = {
        userID: userID,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp
      }
      await API.graphql(
        graphqlOperation(
          createLocation, 
          { input: newLocation }
        )
      ) //addLocation(location);
    }
  } catch (error) {
    console.log('[tracking]', 'Something went wrong when saving a new location...', error);
  }
});