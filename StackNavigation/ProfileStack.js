// HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import Authenticate from '../Components/Authenticate';
const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}} />
            <Stack.Screen name="LoginScreen" component={Authenticate} options={{headerShown: false}} />
            
        </Stack.Navigator>
    );
}