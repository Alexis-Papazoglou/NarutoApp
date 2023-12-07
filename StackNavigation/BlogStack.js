import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BlogScreen from '../Screens/Blog/BlogScreen';
import SpecificArticle from '../Screens/Blog/SpecificArticle';
import Authenticate from '../Components/Authenticate';

const Stack = createStackNavigator();

export default function BlogStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="BlogScreen" component={BlogScreen} options={{headerShown: false}} />
            <Stack.Screen name="SpecificArticle" component={SpecificArticle} options={{headerShown: false}} />
            <Stack.Screen name="LoginScreen" component={Authenticate} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}