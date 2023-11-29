import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text } from 'react-native';

export default function AuthAnimations({ method }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }
        ).start();
    }, [fadeAnim])

    return (
        <Animated.View
            style={{
                ...styles.container,
                opacity: fadeAnim,         // Bind opacity to animated value
            }}
        >
            {method === 'login' ? (
                <>
                    <Image
                        source={require('../assets/madara.gif')}
                        style={styles.gif}
                    />
                    <Text style={styles.message}>Successful Login</Text>
                </>
            ) : (
                <>
                    <Image
                        source={require('../assets/kakashi.gif')}
                        style={styles.gif}
                    />
                    <Text style={styles.message}>Account created successfully</Text>
                </>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width:'100%',
        height:'100%',
        backgroundColor: 'black',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
    },
    gif: {
        borderRadius: 100,
        width: 300,
        height: 300,
    },
    message: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        color: 'white',
    },
});
