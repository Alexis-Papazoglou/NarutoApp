import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useAppState } from '../ContextProviders/AppStateProvider';
import Swiper from 'react-native-swiper';
import Slide2 from '../Components/Slides/Slide2';
import Slide1 from '../Components/Slides/Slide1';
import LoadingAnimation from '../AnimationComponents/LoadingAnimation';

const OnboardingScreenSliders = () => {
    const { updateShowOnboarding } = useAppState();
    const [currentSlide, setCurrentSlide] = useState(0);
    const swiperRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const handleNextSlide = () => {
        if (currentSlide < 1) {
            setCurrentSlide(currentSlide + 1);
            swiperRef.current.scrollBy(1);
        } else {
            updateShowOnboarding(false);
        }
    };

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
            <LoadingAnimation />
        );
    } else {
        return (
            <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
                <Swiper
                    ref={swiperRef}
                    loop={false}
                    onIndexChanged={setCurrentSlide}
                    dotStyle={styles.dot} 
                    activeDotStyle={styles.activeDot} 
                >
                    <Slide1 handleNextSlide={handleNextSlide}/>
                    <Slide2 handleNextSlide={handleNextSlide}/>
                </Swiper>
            </Animated.View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dot: {
        backgroundColor: 'white',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: 'orange',
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 4,
    },
});

export default OnboardingScreenSliders;