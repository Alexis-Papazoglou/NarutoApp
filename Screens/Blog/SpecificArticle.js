import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Animated, ScrollView, ImageBackground } from 'react-native';
import { useAppState } from '../../ContextProviders/AppStateProvider';
import { useFetchArticle } from '../../Hooks/useFetchArticle';
import { useLikeArticle } from '../../Hooks/useLikeArticle';
import ArticleSections from '../../Components/Blog/ArticleSections';
import CommentSection from '../../Components/Blog/CommentSection';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SpecificArticle({ route }) {
  const { user, isLoggedIn } = useAppState();
  const { article, author } = route.params;
  const { likeDoc, handleLike } = useLikeArticle(user?.id, article.id);
  const { likesCount, updateLikes } = useFetchArticle(article.id);
  const [numComments, setNumComments] = useState(0);
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const scrollViewRef = useRef(null);
  const commentsRef = useRef(null);

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
          { text: 'Sign up', onPress: () => navigation.navigate('LoginScreen', { article: article }) },
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      );
      return;
    }

    setIsLiked(!isLiked);
    const wasLiked = await handleLike();
    updateLikes(wasLiked ? 1 : -1);
  };

  const handleCommentIconClick = () => {
    commentsRef.current.measure((x, y, width, height, pageX, pageY) => {
      scrollViewRef.current.scrollToPosition(0, pageY + 100, true);
    });
  };

  return (
    <KeyboardAwareScrollView style={styles.container} ref={scrollViewRef}>
      <ImageBackground source={{ uri: article.imageUrl }} style={styles.image}>
        <View style={styles.overlay}>
          <Text style={[styles.title]}>{article.title}</Text>
          <Text style={[styles.text, styles.author]}>Author : {author ? author.username : 'Loading...'}</Text>
          <View style={[styles.iconsContainer, styles.iconsContainerPosition]}>
            <TouchableOpacity style={styles.iconContainer} onPress={handleLikeClick}>
              <Icon name="heart" size={30} color={(isLoggedIn && likeDoc && likeDoc.exists) ? 'red' : 'grey'} />
              <Text style={styles.text}>{likesCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={handleCommentIconClick}>
              <Icon name="chatbubble-ellipses" size={30} color={numComments > 0 ? 'white' : 'grey'} />
              <Text style={styles.text}>{numComments}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.comments} ref={commentsRef}>
        <ArticleSections style={styles.articleContent} articleId={article.id} />
        <CommentSection setNumComments={setNumComments} user={user} article={article} isLoggedIn={isLoggedIn} />
      </View>
    </KeyboardAwareScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  author: {
    color: 'white',
    fontSize: 18,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    color: 'white',
  },
  comments: {
    paddingBottom: 100,
    marginTop: 5,
  },
});