// Slide1Animation.js
import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Slide1Animation() {
    const animation = useRef(null);
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 1

    useEffect(() => {
        const timer = setTimeout(() => {
            if (animation.current) {
                animation.current.play();
            }
        }, 100); // adjust the delay as needed

        return () => {
            clearTimeout(timer); // clean up on unmount
        };
    }, [fadeAnim]);

    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            <LottieView
                ref={animation}
                style={{
                    width: 330,
                    height: 330,
                    backgroundColor: 'black',
                }}
                source={require('../assets/animationSlide1.json')}
                autoPlay={false}
                loop={true}
            />
        </Animated.View>
    );
}