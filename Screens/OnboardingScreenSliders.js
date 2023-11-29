import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useAppState } from '../ContextProviders/AppStateProvider';
import Swiper from 'react-native-swiper';
import Slide2 from '../Components/Slides/Slide2';
import Slide1 from '../Components/Slides/Slide1';

const OnboardingScreenSliders = () => {
    const { updateShowOnboarding } = useAppState();
    const [currentSlide, setCurrentSlide] = useState(0);
    const swiperRef = useRef(null);

    const handleNextSlide = () => {
        if (currentSlide < 1) {
            setCurrentSlide(currentSlide + 1);
            swiperRef.current.scrollBy(1);
        } else {
            updateShowOnboarding(false);
        }
    };

    return (
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
    );
};

const styles = StyleSheet.create({
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