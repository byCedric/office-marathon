import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AuthLoadingScreen } from '../screens/authloading';
import { DistanceScreen } from '../screens/distance';
import { OnboardingScreen } from '../screens/onboarding';


const Stack = createStackNavigator();

export const NavigationProvider: React.FC = () => (
  <NavigationContainer>
    {/* <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}> */}
    <Stack.Navigator initialRouteName="Authorizing" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Authorizing" component={AuthLoadingScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Distance" component={DistanceScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
