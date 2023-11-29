import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Characters() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Characters</Text>
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
