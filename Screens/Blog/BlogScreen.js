import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import ArticleCard from '../../Components/Blog/ArticleCard';
import { FIREBASE_DB } from '../../firebase';

export default function BlogScreen() {
  const navigation = useNavigation();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articlesCollection = collection(FIREBASE_DB, 'Articles');
      const articlesSnapshot = await getDocs(articlesCollection);
      const articlesList = articlesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setArticles(articlesList);
    };

    fetchArticles();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Writing Articles</Text>
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} navigation={navigation}/>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white'
  },
});