import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Import Ionicons from Expo
import HomeStack from './StackNavigation/HomeStack';
import ExploreStack from './StackNavigation/ExploreStack';
import ProfileStack from './StackNavigation/ProfileStack';
import BlogStack from './StackNavigation/BlogStack';
import BottomNavigationAnimations from './AnimationComponents/BottomNavigationAnimations';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {

    const DecorativeComponent = () => {
        return (
            <View style={styles.decorativeComponent}>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: 'orange',
                    tabBarInactiveTintColor: 'grey',
                    tabBarStyle: styles.tabBar,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Explore"
                    component={ExploreStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="search" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Decorative"
                    component={DecorativeComponent}
                    options={{
                        tabBarButton: () => <TouchableOpacity disabled={true} style={styles.decorativeTabBarButton} />,  // Use a custom style
                    }}
                />
                <Tab.Screen
                    name="Blog"
                    component={BlogStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
            <BottomNavigationAnimations />
        </View>
    );
}

// Define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 55,  // Adjust this value to control the height of the tabBar
        backgroundColor: 'black',
        borderTopColor: 'orange',
        borderTopWidth: 0.4,
    },
    decorativeTabBarButton: {
        flex: 1.4,
    },
});
