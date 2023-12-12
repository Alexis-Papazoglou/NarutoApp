import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CharacterCard from './CharacterCard'; 

export default function CharacterExploreDisplay({ characters, navigation }) {
    return (
        <View style={styles.characterDisplay}>
            <View style={styles.header}>
                <Text style={styles.itemText}>Characters:</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Characters')}>
                    <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.characterCardsContainer}>
                {characters.characters.slice(0, 3).map((character, index) => (
                    <CharacterCard character={character} navigation={navigation} key={index} style={styles.itemText}></CharacterCard>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    characterDisplay: {
        backgroundColor: '#121212', // Slightly brighter than black
        borderRadius: 10, // Optional, if you want rounded corners
        padding: 12, // Add some padding
        paddingTop: 8, // Add some padding
        marginVertical: 10, // Add some margin between the cards
        paddingBottom: 18, // Add some padding
        shadowColor: 'orange',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 3,
        borderColor: 'black',
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 20,
        color: 'white',
        marginBottom: 12,
    },
    viewAllText: {
        color: 'orange',
        fontSize: 18,
        marginBottom: 12,
    },
    characterCardsContainer: {
        alignItems: 'center',
        gap: 20,
        flexDirection: 'row',
    },
});