import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

import { addLocation, getLocations } from './storage';

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
    timeInterval: 60 * 1000,
  });
}

/**
 * Stop the background location monitoring.
 * This is a wrapper around `Location.stopLocationUpdatesAsync` with the task name prefilled.
 */
export async function stopTracking() {
  await Location.stopLocationUpdatesAsync(locationTaskName);
}

/**
 * Define the background task that's adding locations to the storage.
 * This method isn't "directly" connected to React, that's why we store the data locally.
 */
TaskManager.defineTask(locationTaskName, async (event) => {
  if (event.error) {
    return console.log('Something went wrong within the background location task...', event.error);
  }

  const locations = (event.data as any).locations as Location.LocationObject[];
  console.log('Received new locations', locations);

  try {
    await Promise.all(locations.map(location => addLocation(location)));
    console.log('Added new location, currently stored', (await getLocations()).length, 'locations');
  } catch (error) {
    console.log('Something went wrong when saving a new location...', error);
  }
});
