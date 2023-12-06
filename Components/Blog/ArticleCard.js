import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase';

export default function ArticleCard({ article , navigation}) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      const userDoc = await getDoc(doc(FIREBASE_DB, 'Users', article.authorId));
      setAuthor(userDoc.data());
    };

    fetchAuthor();
  }, [article.authorId]);

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('SpecificArticle', { article })}>
      <Text>Author : {author ? author.username : 'Loading...'}</Text>
      <Text>Title : {article.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
});