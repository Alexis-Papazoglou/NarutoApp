import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, ScrollView } from 'react-native';
import LoadingAnimation from '../../AnimationComponents/LoadingAnimation';
import { useAppState } from '../../ContextProviders/AppStateProvider';

export default function HomeScreen() {
    const [loading, setLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const { isLoggedIn, username } = useAppState();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // delay hiding the animation for 2 seconds

        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    useEffect(() => {
        if (!loading) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [loading, fadeAnim]);

    if (loading) {
        return (
            <View style={styles.container}>
                <LoadingAnimation />
            </View>
        );
    } else {
        return (
            <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Welcome ,
                            <Text style={styles.usernameText}> {username}</Text>
                        </Text>
                    </View>
                </ScrollView>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,  // Take up the entire screen
        width: '100%',
        paddingVertical: 20,  // Add some padding
        paddingHorizontal: 10,  // Add some padding
    },
    welcomeContainer: {
        alignSelf: 'flex-start',  // Align this container to the start (left)
    },
    welcomeText: {
        fontSize: 25,
        color: 'white',
        marginVertical: 10,
    },
    usernameText: {
        fontSize: 30,
        color: 'orange',
    },
});