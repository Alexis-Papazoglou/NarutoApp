import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, ScrollView } from 'react-native';
import useFetchAPI from '../../Hooks/useFetchAPI';  // Import the custom hook
import LoadingAnimation from '../../AnimationComponents/LoadingAnimation';
import { useAppState } from '../../ContextProviders/AppStateProvider';
import CharacterCard from '../../Components/CharacterCard';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const [loading, setLoading] = useState(true);
    const { data, error } = useFetchAPI('characters');
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const { isLoggedIn, username } = useAppState();
    const navigation = useNavigation();


    const handleAnimationEnd = () => {
        setTimeout(() => {
            setLoading(false);
        }, 2000); // delay hiding the animation for 2 seconds
    };

    useEffect(() => {
        if (data) {
            handleAnimationEnd();
        }
    }, [data]);

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
            <View style={styles.container}>
                <LoadingAnimation onAnimationEnd={handleAnimationEnd} />
            </View>
        );
    } else {
        return (
            <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Welcome ,
                            <Text style={styles.usernameText}> {username}</Text>
                        </Text>
                    </View>
                    <View style={styles.characterDisplay}>
                        <View style={styles.header}>
                            <Text style={styles.itemText}>Characters:</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Characters')}>
                                <Text style={styles.viewAllText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.characterCardsContainer}>
                            {data.characters.slice(0, 3).map((character, index) => (
                                <CharacterCard character={character} key={index} style={styles.itemText}></CharacterCard>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,  // Take up the entire screen
        width: '100%',
        paddingVertical: 20,  // Add some padding
        paddingHorizontal: 10,  // Add some padding
    },
    welcomeContainer: {
        alignSelf: 'flex-start',  // Align this container to the start (left)
    },
    characterCardsContainer: {
        alignItems: 'center',
        gap: 20,
        flexDirection: 'row',
    },
    welcomeText: {
        fontSize: 25,
        color: 'white',
        marginVertical: 10,
    },
    usernameText: {
        fontSize: 30,
        color: 'orange',
    },
    itemText: {
        fontSize: 20,
        color: 'white',
        marginBottom: 12,
    },
    characterDisplay: {
        backgroundColor: '#151515', // Slightly brighter than black
        borderRadius: 10, // Optional, if you want rounded corners
        padding: 12, // Add some padding
        paddingBottom: 20, // Add some padding
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewAllText: {
        color: 'orange',
        fontSize: 18,
        marginBottom: 12,
    },
});