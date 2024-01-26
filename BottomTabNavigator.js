import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, TouchableOpacity , ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Import Ionicons from Expo
import HomeStack from './StackNavigation/HomeStack';
import ExploreStack from './StackNavigation/ExploreStack';
import ProfileStack from './StackNavigation/ProfileStack';
import BlogStack from './StackNavigation/BlogStack';
import BottomNavigationAnimations from './AnimationComponents/BottomNavigationAnimations';
import * as Haptics from 'expo-haptics';
import { useAppState } from './ContextProviders/AppStateProvider';
import { useState } from 'react';
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { Image } from 'react-native';
import { Dimensions } from 'react-native';

const Tab = createBottomTabNavigator();
const screenHeight = Dimensions.get('window').height;


export default function BottomTabNavigator() {
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAppState();
    const userId = user ? user.id : null;

    useEffect(() => {
        if (userId) {
            setIsLoading(true);
            const db = getFirestore();
            const unsubscribe = onSnapshot(doc(db, 'Users', userId), (doc) => {
                const data = doc.data();
                if (data && data.profilePictureUrl) {
                    setProfilePictureUrl(data.profilePictureUrl);
                }
                setIsLoading(false);
            });

            // Clean up the subscription on unmount
            return () => unsubscribe();
        }
    }, [userId]);

    // this component exists here to create space between the 3rd and 4th tab
    // so we can display the animation component in the space
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
                    listeners={{
                        tabPress: e => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        },
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
                    listeners={{
                        tabPress: e => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        },
                    }}
                />
                <Tab.Screen
                    name="Decorative"
                    component={DecorativeComponent}
                    options={{
                        tabBarButton: () => <TouchableOpacity disabled={true} style={styles.decorativeTabBarButton} />,
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
                    listeners={{
                        tabPress: e => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        },
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            isLoading
                                ? <ActivityIndicator size="small" color={color} />
                                : user && profilePictureUrl
                                    ? <Image source={{ uri: profilePictureUrl }} style={[styles.imageStyle, { width: size+5, height: size+5, borderRadius: size + 5 / 2 }]} />
                                    : <Ionicons name="person" color={color} size={size} />
                        ),
                    }}
                    listeners={{
                        tabPress: e => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        },
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
        height: screenHeight > 800 ? 85 : 55,  // Adjust this value to control the height of the tabBar
        backgroundColor: '#151515',
        borderTopColor: 'orange',
        borderTopWidth: 0.3,
    },
    decorativeTabBarButton: {
        flex: 1.5,
    },
    imageStyle: {
        borderWidth: 1,
        borderColor: 'orange',
    },
});
