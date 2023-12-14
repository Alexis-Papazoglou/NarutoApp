import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AppStateProvider, useAppState } from './ContextProviders/AppStateProvider';
import OnboardingScreenSliders from './Screens/OnboardingScreenSliders';
import BottomTabNavigator from './BottomTabNavigator';
import LoadingAnimation from './AnimationComponents/LoadingAnimation';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black'
  },
};

const MainApp = () => {
  const { isAppLoading, showOnboarding } = useAppState();

  if (isAppLoading) {
    return <LoadingAnimation />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      {showOnboarding ? (
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