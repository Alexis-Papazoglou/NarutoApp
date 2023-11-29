import { StyleSheet, View, Animated, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import * as Haptics from 'expo-haptics';

export default function BottomNavigationAnimations() {
    const gifs = [
        require('../assets/kakashi.gif'),
        require('../assets/madara.gif'),
        require('../assets/sasuke.gif'),
        require('../assets/fight.gif'),
        require('../assets/eyes.gif'),
        require('../assets/naruto.gif'),
        require('../assets/itachi.gif'),
        require('../assets/itachi2.gif'),
    ];
    const gifIndex = useRef(0);
    const [currentGif, setCurrentGif] = useState(gifs[gifIndex.current]);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const positionAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            gifIndex.current = (gifIndex.current + 1) % gifs.length;
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 2500,
                useNativeDriver: true,
            }).start(() => {
                setCurrentGif(gifs[gifIndex.current]);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 2500,
                    useNativeDriver: true,
                }).start();
            });
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const handlePressIn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 3,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(positionAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(positionAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const containerStyle = {
        ...styles.container,
        transform: [
            { scale: scaleAnim },
            {
                translateY: positionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100],
                }),
            },
        ],
    };

    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={containerStyle}>
                <Animated.Image imageStyle={{ borderRadius: 50}} style={{ ...styles.gifStyle, opacity: fadeAnim }} source={currentGif} />
                <View style={styles.borderTop} />
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: 'orange',
        borderWidth: 1,
        shadowColor: 'orange',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 20.84,
        elevation: 3,
        backgroundColor: 'black',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width: 90,
        height: 40,
        backgroundColor: 'white',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    gifStyle: {
        width: 90,
        height: 90,
        borderRadius: 50,
    }
});