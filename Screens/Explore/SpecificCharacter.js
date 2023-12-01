import { StyleSheet, Text, View, Image, Animated, TouchableOpacity, PanResponder, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'

export default function SpecificCharacter({ route }) {
    const { character } = route.params;
    const scrollY = useRef(new Animated.Value(0)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    // When the view is expanded, animate the opacity of the reset button to 1
    useEffect(() => {
        Animated.timing(buttonOpacity, {
            toValue: isExpanded ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [isExpanded]);

    // Interpolate scroll values for different properties
    const interpolateScroll = (scrollY, inputRange, outputRange) => {
        return scrollY.interpolate({
            inputRange,
            outputRange,
            extrapolate: 'clamp',
        });
    }

    // Interpolate scroll values for different properties
    
    const textContainerHeight = interpolateScroll(scrollY, [0, 100], ['65%', '85%']);
    const textMarginBot = interpolateScroll(scrollY, [0, 100], ['0%', '20%']);
    const overlayBackgroundColor = interpolateScroll(scrollY, [0, 100], ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.8)']);

    // Create a pan responder to handle touch events
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => !isExpanded, // Only respond to touch events if the view is not expanded
        onPanResponderMove: (event, gestureState) => {
            if (Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && gestureState.dy < 0) { // If the user is scrolling up
                scrollY.setValue(-gestureState.dy); // Update the scroll value
                setIsExpanded(true); // Set the view to expanded
            }
        },
        onPanResponderRelease: (event, gestureState) => {
            // When the user releases the touch, animate the scroll value to the height of the window
            Animated.timing(scrollY, {
                toValue: Dimensions.get('window').height,
                duration: 500,
                useNativeDriver: false,
            }).start();
        },
    });

    const resetView = () => {
        scrollY.setValue(0);
        setIsExpanded(false);
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: character.images[0] }} style={styles.image} />
                <Animated.View style={[styles.overlay, { backgroundColor: overlayBackgroundColor }]} />
            </View>
            <Animated.ScrollView
                ref={scrollViewRef}
                style={[styles.textContainer, { height: textContainerHeight, marginBottom: textMarginBot }]}
                scrollEnabled={isExpanded}
            >
                <Text style={styles.text}>{character.name}</Text>
                <Text style={[styles.text , styles.last]}>{character.jutsu}</Text>
            </Animated.ScrollView>
            <Animated.View style={[styles.resetButton, { opacity: buttonOpacity }]}>
                <TouchableOpacity onPress={resetView}>
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 22,
        backgroundColor: 'black',
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '40%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '65%',
        marginHorizontal: 8,
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'orange',
    },
    resetButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 10,
        backgroundColor: 'orange',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
    },
    text: {
        color: 'white',
    },
    last: {
        paddingBottom: 50,
    }
})