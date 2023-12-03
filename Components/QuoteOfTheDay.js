import { StyleSheet, Text, View, ImageBackground, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { quotes } from '../quotes';

export default function QuoteOfTheDay() {
    const [isLoading, setIsLoading] = useState(true);
    const randomQuote = Math.floor(Math.random() * quotes.quotes.length);

    return (
        <View style={styles.container}>
            <Text style={styles.quoteText}>
                <Text style={styles.todayText}>Today's </Text>
                <Text style={styles.quoteColor}>Quote</Text>
            </Text>
            <View style={styles.shadow}>
                <ImageBackground
                    borderRadius={10}
                    source={quotes.quotes[randomQuote].gif_path}
                    style={styles.background}
                    onLoadEnd={() => setIsLoading(false)}
                >
                    {isLoading && (
                        <View style={[styles.overlay, styles.centered]}>
                            <ActivityIndicator size="large" color="orange" />
                        </View>
                    )}
                    <View style={styles.overlay}>
                        <Text style={styles.text}>{quotes.quotes[randomQuote].quote}</Text>
                        <Text style={styles.quoteColor}>{quotes.quotes[randomQuote].character}</Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        width: '85%',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    quoteText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'right',
        marginTop: 20,
        marginBottom: 10,
        zIndex: 1,
    },
    todayText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'right',
    },
    quoteColor: {
        color: 'orange',
        fontSize: 20,
        textAlign: 'right',
    },
    shadow: {
        backgroundColor: 'black',
        shadowColor: 'orange',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 5, // for Android
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
});