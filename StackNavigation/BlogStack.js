import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BlogScreen from '../Screens/Blog/BlogScreen';
const Stack = createStackNavigator();

export default function BlogStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="BlogScreen" component={BlogScreen} options={{headerShown: false}} />
            {/* Add more screens here */}
        </Stack.Navigator>
    );
}