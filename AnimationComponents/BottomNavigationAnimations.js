import { StyleSheet, View, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

export default function BottomNavigationAnimations() {
    const gifs = [
        require('../assets/kakashi.gif'),
        require('../assets/madara.gif'),
        // Add more gifs here
    ];
    const gifIndex = useRef(0);  // Initial index: 0
    const [currentGif, setCurrentGif] = useState(gifs[gifIndex.current]);
    const fadeAnim = useRef(new Animated.Value(1)).current;  // Initial value for opacity: 1

    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }).start(() => {
                gifIndex.current = (gifIndex.current + 1) % gifs.length;  // Update the index
                setCurrentGif(gifs[gifIndex.current]);  // Update the gif
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }).start();
            });
        }, 5000);  // Change gifs every 3 seconds

        return () => clearInterval(interval);  // Clean up on component unmount
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image style={{...styles.gifStyle, opacity: fadeAnim}} source={currentGif} />
            <View style={styles.borderTop} />
        </View>
    )
}

// Your styles here

// Your styles here

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
        shadowColor: 'orange',  // Set the shadow color to black
        shadowOffset: {
            width: 0,  // Set the horizontal offset of the shadow to 0
            height: 2,  // Set the vertical offset of the shadow to 2
        },
        shadowOpacity: 0.7,  // Set the opacity of the shadow to 0.25
        shadowRadius: 30.84,  // Set the blur radius of the shadow to 3.84
        elevation: 3,  // Set the elevation of the shadow to 5 (for Android)
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