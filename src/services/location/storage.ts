import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationObject } from 'expo-location';

/**
 * The unique key of the location storage.
 */
export const locationStorageName = 'locations';

/**
 * Get all stored locations from storage.
 * This is a wrapper around AsyncStorage to parse stored JSON.
 */
export async function getLocations(): Promise<LocationObject[]> {
  const data = await AsyncStorage.getItem(locationStorageName);
  return data ? JSON.parse(data) : [];
}

/**
 * Update the locations in storage.
 * This is a wrapper around AsyncStorage to stringify the JSON.
 */
export async function setLocations(locations: LocationObject[]): Promise<void> {
  await AsyncStorage.setItem(locationStorageName, JSON.stringify(locations));
}

/**
 * Add a new location to the storage.
 * This is a helper to append a new location to the storage.
 */
export async function addLocation(location: LocationObject): Promise<LocationObject[]> {
  const existing = await getLocations();
  const locations = [...existing, location];
  await setLocations(locations);
  console.log('[storage]', 'added location -', locations.length, 'stored locations');
  return locations;
}

/**
 * Reset all stored locations.
 */
export async function clearLocations(): Promise<void> {
  await AsyncStorage.removeItem(locationStorageName);
  console.log('[storage]', 'cleared locations');
}
