// HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../Screens/Explore/ExploreScreen';
const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{headerShown: false}} />
            {/* Add more screens here */}
        </Stack.Navigator>
    );
}