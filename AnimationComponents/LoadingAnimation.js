// LoadingAnimation.js
import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LoadingAnimation({ onAnimationEnd }) {
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
  }, [fadeAnim, onAnimationEnd]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <LottieView
        ref={animation}
        style={{
          width: 300,
          height: 300,
          backgroundColor: '#eee',
          borderRadius: 110,
        }}
        source={require('../animation.json')}
        autoPlay={false}
        loop={true}
      />
    </Animated.View>
  );
}