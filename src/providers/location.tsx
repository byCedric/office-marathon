import { useCallback, useEffect, useMemo, useState } from 'react';
import { LocationObject } from 'expo-location';

import * as Storage from '../services/location/storage';
import * as Task from '../services/location/task';

const geodist = require('geodist');

/**
 * Calculate the rough distance (in meters) between multiple coordinates.
 */
function getDistanceFromLocations(locations: LocationObject[]) {
  if (locations.length < 2) {
    return 0;
  }

  return locations
    .map(location => ({ lat: location.coords.latitude, lon: location.coords.longitude }))
    .reduce((distance, location, index, all) => {
      // skip the first index, we are comparing "current" vs the previous location
      if (index === 0) {
        return distance;
      }
      return distance + geodist(
        all[index - 1], // previous location
        location, // current location
        { exact: true, unit: 'm' }, // we want it semi-exact, in meters
      );
    }, 0);
}

/**
 * An easy-to-use hook that combines all required functionality.
 * It keeps the data in sync as much as possible.
 */
export function useLocationTracking(autoStart = false) {
  const [locations, setLocations] = useState<LocationObject[]>();
  const [isTracking, setIsTracking] = useState<boolean>();

  const onStartTracking = useCallback(async () => {
    await Task.startTracking();
    setIsTracking(true);
  }, []);

  const onStopTracking = useCallback(async () => {
    await Task.stopTracking();
    setIsTracking(false);
  }, []);

  const onClearTracking = useCallback(async () => {
    if (isTracking) {
      await onStopTracking();
    }
    await Storage.clearLocations();
    setLocations([]);
  }, [isTracking]);

  useEffect(() => {
    Storage.getLocations().then(setLocations);
    Task.isTracking().then(isTracking => {
      setIsTracking(isTracking);
      if (autoStart && !isTracking) {
        onStartTracking();
      }
    });
  }, [autoStart]);

  return {
    locations,
    isTracking,
    startTracking: onStartTracking,
    stopTracking: onStopTracking,
    clearTracking: onClearTracking,
  };
}

/**
 * A hook to calculate the distance, in meters, between the registered locations.
 */
export function useLocationDistance(locations: LocationObject[] = []) {
  // Let's memoize this method to avoid costly calculations
  return useMemo(
    () => getDistanceFromLocations(locations || []),
    [locations],
  );
}
