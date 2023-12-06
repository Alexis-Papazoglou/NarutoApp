import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { doc, updateDoc, addDoc, collection, deleteDoc, getDoc, increment, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from '../../firebase';
import { useAppState } from '../../ContextProviders/AppStateProvider';

export default function SpecificArticle({ route }) {
  const { user , isLoggedIn } = useAppState();
  const { article } = route.params;
  const [likeDoc, setLikeDoc] = useState(null);
  const [likesCount, setLikesCount] = useState(0); // New state variable for likes count

  useEffect(() => {
    const fetchArticleAndLikes = async () => {
      const articleRef = doc(FIREBASE_DB, 'Articles', article.id);
      const articleSnap = await getDoc(articleRef);
      if (articleSnap.exists()) {
        setLikesCount(articleSnap.data().likes || 0); // Update likes count
      }

      if (isLoggedIn && user) {
        const likesCollectionRef = collection(FIREBASE_DB, 'Likes');
        const likeSnap = await getDocs(query(likesCollectionRef, where('userId', '==', user.id), where('articleId', '==', article.id)));
        if (!likeSnap.empty) {
          setLikeDoc(likeSnap.docs[0]); // Set likeDoc to the first document snapshot that matches the query
        }
      }
    };

    fetchArticleAndLikes();
  }, [isLoggedIn, user, article.id]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      Alert.alert('Please log in to like or dislike articles.');
      return;
    }

    const articleRef = doc(FIREBASE_DB, 'Articles', article.id);

    if (likeDoc && likeDoc.exists) { // Check if likeDoc exists
      await deleteDoc(likeDoc.ref);
      await updateDoc(articleRef, { likes: increment(-1) });
      setLikeDoc(null);
      setLikesCount((count) => count - 1); // Decrement likes count
      console.log('Article unliked successfully'); // Log for successful unlike
    } else {
      const likeRef = await addDoc(collection(FIREBASE_DB, 'Likes'), {
        userId: user.id,
        articleId: article.id,
      });
      const newLikeSnap = await getDoc(likeRef);
      await updateDoc(articleRef, { likes: increment(1) });
      setLikeDoc(newLikeSnap); // Set likeDoc to the new document snapshot
      setLikesCount((count) => count + 1); // Increment likes count
      console.log('Article liked successfully'); // Log for successful like
    }
  };

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text>Article ID : {article.id}</Text>
        {user && <Text>User ID : {user.id}</Text>}
        <Text>Article likes : {likesCount}</Text>
        <Text>Liked the doc : {likeDoc ? 'Yes' : 'No'}</Text>
        <TouchableOpacity onPress={handleLike}>
          <Text>{likeDoc ? 'Dislike' : 'Like'}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Article ID : {article.id}</Text>
        <Text>Article likes : {likesCount}</Text>
        <Text>You are not logged in</Text>
        <TouchableOpacity onPress={handleLike}><Text>Like</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: 'white'
  }
});