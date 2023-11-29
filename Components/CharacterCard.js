import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

export default function CharacterCard({ character }) {
    return (
        <View style={styles.container}>
            <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                style={styles.image}
                source={{ uri: character.images[0] }}
            >
                <View style={styles.overlay} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{character.name}</Text>
                </View>
            </ImageBackground>
        </View>
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
})