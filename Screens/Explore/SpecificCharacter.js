import React, { useRef, useState, useEffect, createRef } from 'react';
import { StyleSheet, Text, View, Image, Animated, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { capitalizeFirstLetter } from '../../utils';

export default function SpecificCharacter({ route }) {
    const { character } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const scrollY = useRef(new Animated.Value(0)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;
    const [isExpanded, setIsExpanded] = useState(false);
    const scrollViewRef = createRef();

    useEffect(() => {
        Animated.timing(buttonOpacity, {
            toValue: isExpanded ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [isExpanded]);

    const interpolateScroll = (scrollY, inputRange, outputRange) => {
        return scrollY.interpolate({
            inputRange,
            outputRange,
            extrapolate: 'clamp',
        });
    }

    const textContainerHeight = interpolateScroll(scrollY, [0, 100], ['65%', '85%']);
    const textMarginBot = interpolateScroll(scrollY, [0, 100], ['0%', '20%']);
    const overlayBackgroundColor = interpolateScroll(scrollY, [0, 100], ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.8)']);

    const expandView = () => {
        if (!isExpanded) {
            Animated.timing(scrollY, {
                toValue: Dimensions.get('window').height,
                duration: 500,
                useNativeDriver: false,
            }).start();
            setIsExpanded(true);
        }
    }

    const resetView = () => {
        scrollY.setValue(0);
        setIsExpanded(false);
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {isLoading && (
                    <View style={styles.activityIndicatorContainer}>
                        <ActivityIndicator size="large" color="orange" />
                    </View>
                )}
                <Image
                    source={character.name.toLowerCase() === 'jiraiya'
                        ? require('../../assets/Jiraiya_main.jpg')
                        : character.images && Array.isArray(character.images) && (character.images[1] || character.images[0])
                            ? { uri: character.images[1] ? character.images[1] : character.images[0] }
                            : require('../../assets/NoImage.png')}
                    style={styles.image}
                    onLoadStart={() => setIsLoading(true)}
                    onLoadEnd={() => setIsLoading(false)}
                />
                <Animated.View style={[styles.overlay, { backgroundColor: overlayBackgroundColor }]} />
            </View>
            <Animated.ScrollView
                ref={scrollViewRef}
                onTouchStart={expandView}
                style={[styles.textContainer, { height: textContainerHeight, marginBottom: textMarginBot }]}
                scrollEnabled={isExpanded}
                stickyHeaderIndices={[0]} // Add this line
            >
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{character.name}</Text>
                </View>
                <View style={styles.contentContainer}>
                    {Object.entries(character.personal).map(([key, value], index) => {
                        return (
                            <View key={index} style={styles.detailContainer}>
                                <Text style={styles.detailKey}>{capitalizeFirstLetter(key)} :</Text>
                                {typeof value === 'object' ? (
                                    Object.entries(value).map(([subKey, subValue], subIndex) => (
                                        <Text key={subIndex} style={styles.detailValue}>{`${subKey}: ${subValue}`}</Text>
                                    ))
                                ) : (
                                    <Text style={styles.detailValue}>{value}</Text>
                                )}
                            </View>
                        );
                    })}
                </View>
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
    activityIndicatorContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'orange',
    },
    resetButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        paddingHorizontal: 14,
        paddingVertical: 7,
        backgroundColor: 'orange',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
    nameText: {
        color: 'orange',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        paddingVertical: 12,
    },
    nameContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'orange',
        paddingVertical: 12,
        backgroundColor: 'black'
    },
    last: {
        paddingBottom: 50,
    },
    detailContainer: {
        marginVertical: 5,
    },
    detailKey: {
        paddingBottom: 4,
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 18,
    },
    detailValue: {
        color: 'white',
        fontSize: 16,
    },
})