import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

export default function CharacterCard({ character, navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    let imageSource = character.images[1] ? { uri: character.images[1] } : { uri: character.images[0] };

    // Replace the imageSource with the local image path if the character
    // is Jiraiya because the API doesn't have a good image for him
    if (character.name === 'Jiraiya') {
        imageSource = require('../assets/Jiraiya_main.jpg'); // replace with your local image path
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('SpecificCharacter', { character })}>
            <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                style={styles.image}
                source={imageSource}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
            >
                {isLoading && <ActivityIndicator size="small" color="orange" style={styles.loadingIndicator} />}
                <View style={styles.overlay} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{character.name}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        width: 90,
        height: 90,
        borderRadius: 10,
        justifyContent: 'flex-end',
        shadowColor: 'orange',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.7,
        shadowRadius: 5.84,
        elevation: 3,
        borderColor: 'orange',
        borderWidth: 0.8,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 10,
    },
    name: {
        fontSize: 12,
        textAlign: 'right',
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        padding: 8,
    },
    loadingIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
})