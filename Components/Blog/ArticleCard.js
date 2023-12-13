import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';

import { onSnapshot , doc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ArticleCard({ article, navigation }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const userRef = doc(FIREBASE_DB, 'Users', article.authorId);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      setAuthor(doc.data());
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [article.authorId]);

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('SpecificArticle', { article, author })}>
      <ImageBackground source={{ uri: article.imageUrl }} style={styles.image}>
        <View style={styles.overlay}>
          <Text style={[styles.titleText, styles.title]}>{article.title}</Text>
          <Text style={[styles.text, styles.author]}>Author : {author ? author.username : 'Loading...'}</Text>
          <View style={[styles.iconsContainer, styles.iconsContainerPosition]}>
            <View style={styles.iconContainer}>
              <Icon name="heart" size={20} color="white" />
              <Text style={styles.text}>{article.likes}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="comment" size={20} color="white" />
              <Text style={styles.text}>{article.comments}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: 'orange',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5, // add elevation for Android
    borderColor: 'orange',
    borderWidth: 1,
  },
  title: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  author: {
    position: 'absolute',
    bottom: 35,
  },
  iconsContainerPosition: {
    position: 'absolute',
    bottom: 10,
  },
  text: {
    color: 'white',
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    width: '90%',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden', // ensure the borderRadius is applied to the ImageBackground
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});