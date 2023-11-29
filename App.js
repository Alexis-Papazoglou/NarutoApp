// App.js
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AppStateProvider, useAppState } from './ContextProviders/AppStateProvider';
import OnboardingScreenSliders from './Screens/OnboardingScreenSliders';
import BottomTabNavigator from './BottomTabNavigator';  // Import BottomTabNavigator

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black'
  },
};

const MainApp = () => {
  const { showOnboarding, isLoggedIn } = useAppState();

  return (
    <NavigationContainer theme={MyTheme}>
      {showOnboarding && !isLoggedIn ? (
        <OnboardingScreenSliders />
      ) : (
        <BottomTabNavigator />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <MainApp />
    </AppStateProvider>
  );
}