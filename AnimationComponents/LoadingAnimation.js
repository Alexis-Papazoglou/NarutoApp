import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet , View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LoadingAnimation({ onAnimationEnd }) {
  const animation1 = useRef(null);
  const animation2 = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current; 

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animation1.current) {
        animation1.current.play();
      }
      if (animation2.current) {
        animation2.current.play();
      }
    }, 100); // adjust the delay as needed

    return () => {
      clearTimeout(timer); // clean up on unmount
    };
  }, [fadeAnim, onAnimationEnd]);

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.animationContainer, { opacity: fadeAnim }]}>
        <View style={{ borderRadius: 120, overflow: 'hidden' }}>
          <LottieView
            ref={animation1}
            style={styles.animation1}
            source={require('../assets/loadingNaruto.json')}
            autoPlay={true}
            loop={true}
            onLoad={() => animation1.current.play()}
          />
        </View>
        <LottieView
          speed={1.7}
          ref={animation2}
          style={styles.animation2}
          source={require('../assets/loading.json')}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation1: {
    width: 300,
    height: 300,
    backgroundColor: '#eee',
    borderRadius: 120,
    shadowColor: 'orange', // Set the shadow color to orange
    shadowOffset: { width: 0, height: 2 }, // Set the shadow offset
    shadowOpacity: 0.5, // Set the shadow opacity
    shadowRadius: 30, // Set the shadow radius
  },
  animation2: {
    width: 300,
    height: 300, // Adjust height as needed
    marginTop: -200, // Added negative margin
  },
});