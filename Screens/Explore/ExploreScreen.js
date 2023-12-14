import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, ScrollView } from 'react-native';
import useFetchAPI from '../../Hooks/useFetchAPI';  // Import the custom hook
import LoadingAnimation from '../../AnimationComponents/LoadingAnimation';
import CharacterExploreDisplay from '../../Components/ExploreScreen/CharacterExploreDisplay';
import { useNavigation } from '@react-navigation/native';
import ClansExploreDisplay from '../../Components/ExploreScreen/ClansExploreDisplay';

export default function ExploreScreen() {
    const [loading, setLoading] = useState(true);
    const { data: characters, error } = useFetchAPI('characters');
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const navigation = useNavigation();

    const handleAnimationEnd = () => {
        setTimeout(() => {
            setLoading(false);
        }, 500); // delay hiding the animation for 2 seconds
    };

    useEffect(() => {
        if (characters) {
            handleAnimationEnd();
        }
    }, [characters]);

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
            <LoadingAnimation onAnimationEnd={handleAnimationEnd} />
        );
    } else {
        return (
            <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.textContainer}>
                        <Text style={styles.header}>Explore Our Collection</Text>
                        <Text style={styles.text}>Dive into a curated collection brought to you by the curator.</Text>
                        <Text style={styles.text}>Click on an item to explore and enjoy the content.</Text>
                    </View>
                    <CharacterExploreDisplay characters={characters} navigation={navigation} />
                    <ClansExploreDisplay navigation={navigation} />
                </ScrollView>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    scrollView: {
        width: '100%',
        paddingVertical: 20,  // Add some padding
        paddingHorizontal: 10,  // Add some padding
        paddingBottom: 120,  // Add some padding
    },
    characterCardsContainer: {
        alignItems: 'center',
        gap: 20,
        flexDirection: 'row',
    },
    itemText: {
        fontSize: 20,
        color: 'white',
        marginBottom: 12,
    },
    characterDisplay: {
        backgroundColor: '#121212', // Slightly brighter than black
        borderRadius: 10, // Optional, if you want rounded corners
        padding: 12, // Add some padding
        paddingTop: 8, // Add some padding
        marginVertical: 10, // Add some margin between the cards
        paddingBottom: 18, // Add some padding
        shadowColor: 'orange',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5, // for Android
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'orange',
        textAlign: 'center',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        width: '85%',
    },
    textContainer: {
        alignSelf: 'center',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingBottom: 10,
    },
});