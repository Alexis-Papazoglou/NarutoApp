import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import { AppStateProvider, useAppState } from './ContextProviders/AppStateProvider';
import OnboardingScreenSliders from './Screens/OnboardingScreenSliders';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black'
  },
};

const MainApp = () => {
  const { showOnboarding } = useAppState();

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Home">
        {showOnboarding ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreenSliders} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        )}
        {/* Add more screens here */}
      </Stack.Navigator>
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