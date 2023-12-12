import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import ArticleCard from '../../Components/Blog/ArticleCard';
import { FIREBASE_DB } from '../../firebase';

export default function BlogScreen() {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Writing Articles</Text>
        <Text style={styles.text}>Here you can find all the articles that have been written by our users.</Text>
        <Text style={styles.text}>Click on an article to read it.</Text>
      </View>
      <View style={styles.articlesContainer}>
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 150,
  },
  textContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'orange'
  },
  text: {
    color: 'white',
    textAlign: 'center'
  },
  articlesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30%',
    width: '100%',
    marginTop: 20
  }
});