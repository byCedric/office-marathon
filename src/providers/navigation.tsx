import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { DistanceScreen } from '../screens/distance';
import { OnboardingScreen } from '../screens/onboarding';

export type StackParamList = {
  Onboarding: undefined;
  Distance: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export const NavigationProvider: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Distance" component={DistanceScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
