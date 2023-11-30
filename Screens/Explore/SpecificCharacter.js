import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SpecificCharacter( { route } ) {
    const { character } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{character.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
    },
})