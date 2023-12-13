import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/Home/HomeScreen';
import SpecificArticle from '../Screens/Blog/SpecificArticle';
const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="SpecificArticle" component={SpecificArticle} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}