// HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../Screens/Explore/ExploreScreen';
import Characters from '../Screens/Explore/Characters';
import SpecificCharacter from '../Screens/Explore/SpecificCharacter';
const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{headerShown: false}} />
            <Stack.Screen name="Characters" component={Characters} options={{headerShown: false}} />
            <Stack.Screen name="SpecificCharacter" component={SpecificCharacter} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}