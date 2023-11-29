// HomeScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import LoadingAnimation from '../AnimationComponents/LoadingAnimation';
import { useAppState } from '../ContextProviders/AppStateProvider';

export default function HomeScreen() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const { isLoggedIn , username } = useAppState();

    const handleAnimationEnd = () => {
        setTimeout(() => {
            setLoading(false);
        }, 2000); // delay hiding the animation for 2 seconds
    };

    useEffect(() => {
        fetch('https://dattebayo-api.onrender.com/clans')
            .then(response => response.json())
            .then(json => {
                setData(json);
                handleAnimationEnd();
            })
            .catch(error => console.error(error));
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
                <LoadingAnimation onAnimationEnd={handleAnimationEnd} />
            </View>
        );
    } else {
        return (
            <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
                <Text style={{ color: 'red' }}>
                    Logged: {isLoggedIn ? username : 'False'}
                </Text>
                {Array.isArray(data.clans) && data.clans.map((item, index) => (
                    <Text style={{ color: 'white' }} key={index}>{item.name}</Text>
                ))}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
});