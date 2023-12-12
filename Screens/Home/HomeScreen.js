import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, ScrollView } from 'react-native';
import LoadingAnimation from '../../AnimationComponents/LoadingAnimation';
import { useAppState } from '../../ContextProviders/AppStateProvider';
import QuoteOfTheDay from '../../Components/QuoteOfTheDay';
import ArticleCard from '../../Components/Blog/ArticleCard';
import { collection, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const [loading, setLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const { isLoggedIn, user } = useAppState();
    const navigation = useNavigation();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const articlesCollection = collection(FIREBASE_DB, 'Articles');
        const unsubscribe = onSnapshot(articlesCollection, (snapshot) => {
            const articlesList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setArticles(articlesList);
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // delay hiding the animation for 2 seconds

        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

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
                <LoadingAnimation />
            </View>
        );
    } else {
        return (
            <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Welcome ,
                            <Text style={styles.usernameText}> {isLoggedIn ? user.username : 'Random User'}</Text>                        </Text>
                    </View>
                    <QuoteOfTheDay />
                    <Text style={styles.popular}>Popular Articles:</Text>
                    <View style={styles.articlesContainer}>
                        {[articles[0], articles[3]].map(article => (
                            <ArticleCard key={article.id} article={article} navigation={navigation} />
                        ))}
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
        marginTop: 30,
    },
    scrollView: {
        width: '100%',
        paddingHorizontal: 10,  // Add some padding
        paddingBottom: 120,  // Add some padding
    },
    welcomeContainer: {
        alignSelf: 'flex-start',  // Align this container to the start (left)
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
    popular: {
        fontSize: 20,
        color: 'orange',
        marginVertical: 20,
        textAlign: 'left',
    },
    articlesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '30%',
        width: '100%',
    }
});