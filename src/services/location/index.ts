import { LocationObject } from 'expo-location';
import { useCallback, useEffect, useMemo, useState } from 'react';

import * as Storage from './storage';
import * as Track from './track';

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
      const total = distance + geodist(
        all[index - 1], // previous location
        location, // current location
        { exact: true, unit: 'meters' }, // we want it semi-exact, in meters
      );
      return total;
    }, 0);
}

/**
 * An easy-to-use hook that combines all required functionality.
 * It keeps the data in sync as much as possible.
 */
export function useLocationTracking() {
  const [isTracking, setIsTracking] = useState<boolean>();

  const onStartTracking = useCallback(async () => {
    await Track.startTracking();
    setIsTracking(true);
  }, []);

  const onStopTracking = useCallback(async () => {
    await Track.stopTracking();
    setIsTracking(false);
  }, []);

  const onClearTracking = useCallback(async () => {
    if (isTracking) {
      await onStopTracking();
    }
    await Storage.clearLocations();
  }, [isTracking]);

  useEffect(() => {
    Track.isTracking().then(setIsTracking);
  }, []);

  return {
    isTracking,
    startTracking: onStartTracking,
    stopTracking: onStopTracking,
    clearTracking: onClearTracking,
  };
}

/**
 * A hook to poll for changes in the storage, updates the UI if locations were added.
 */
export function useLocationData(interval = 1000) {
  const [locations, setLocations] = useState<LocationObject[]>([]);

  const onPollStorage = useCallback(async () => {
    const stored = await Storage.getLocations();
    if (stored.length !== locations.length) {
      setLocations(stored);
    }
  }, []);

  useEffect(() => {
    // load the locations on first render
    Storage.getLocations().then(setLocations);
    // create a timer to poll for changes
    const timerId = window.setInterval(onPollStorage, interval);
    // when the hook is unmounted, remove the timer
    return () => window.clearInterval(timerId);
  }, [interval]);

  return locations;
}

/**
 * A hook to calculate the distance, in meters, between the registered locations.
 */
export function useLocationDistance(locations: LocationObject[], precision = 2) {
  // Let's memoize this method to avoid costly calculations
  return useMemo(() => {
    const distance = getDistanceFromLocations(locations);
    const factor = Math.pow(10, precision);
    const rounded = Math.round(distance * factor) / factor;
    return rounded;
  }, [locations, precision]);
}
