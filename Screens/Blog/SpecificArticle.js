// SpecificArticle.js
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Image, Animated, ScrollView } from 'react-native';
import { useAppState } from '../../ContextProviders/AppStateProvider';
import { useFetchArticle } from '../../Hooks/useFetchArticle';
import { useLikeArticle } from '../../Hooks/useLikeArticle';
import ArticleSections from '../../Components/Blog/ArticleSections';
import CommentSection from '../../Components/Blog/CommentSection';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SpecificArticle({ route }) {
  const { user, isLoggedIn } = useAppState();
  const { article, author } = route.params;
  const { likeDoc, handleLike } = useLikeArticle(user?.id, article.id);
  const { likesCount, updateLikes } = useFetchArticle(article.id);
  // gets the number of comments from the CommentSection component so we don't have to fetch it again
  const [numComments, setNumComments] = useState(0);
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);


  const [scale, setScale] = useState(new Animated.Value(1));

  useEffect(() => {
    animateIcon();
  }, [likeDoc]);

  const animateIcon = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    setIsLiked(likeDoc && likeDoc.exists);
  }, [likeDoc]);
  
  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      Alert.alert(
        'Not Logged In',
        'Please log in to like or dislike articles.',
        [
          {text: 'Sign up', onPress: () => navigation.navigate('LoginScreen', { article: article })},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      );
      return;
    }
  
    setIsLiked(!isLiked);
    const wasLiked = await handleLike();
    updateLikes(wasLiked ? 1 : -1);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Author : {author ? author.username : 'Loading...'}</Text>
      <Text style={styles.text}>Article title : {article.title}</Text>
      {isLoggedIn && user && <Text style={styles.text}>User ID : {user.id}</Text>}
      <Text style={styles.text}>Article likes : {likesCount}</Text>
      <Text style={styles.text}>Article comments  : {numComments}</Text>
      <Animated.View style={{ transform: [{ scale: scale }] }}>
        <TouchableOpacity onPress={handleLikeClick}>
          <Icon name="heart" size={108} color={(isLoggedIn && likeDoc && likeDoc.exists) ? 'red' : 'grey'} />
        </TouchableOpacity>
      </Animated.View>
      {article.imageUrl && <Image source={{ uri: article.imageUrl }} style={{ width: 40, height: 40 }} />}
      <ArticleSections articleId={article.id} />
      <CommentSection setNumComments={setNumComments} user={user} article={article} isLoggedIn={isLoggedIn} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: 'black'
  },
  text: {
    color: 'white'
  }
});