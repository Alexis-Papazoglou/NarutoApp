// HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}} />
            {/* Add more screens here */}
        </Stack.Navigator>
    );
}