// CommentSection.js
import React, { useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useCommentArticle } from '../../Hooks/useCommentArticle';
import { useNavigation } from '@react-navigation/native';
import { utilsConvertTimestamp } from '../../utils/';

export default function CommentSection({ user, article, isLoggedIn, setNumComments }) {
    const { comments, newCommentText, setNewCommentText, addComment, commentsCount } = useCommentArticle(user, article.id);
    const navigation = useNavigation();

    // sets the state of the parent component (SpecificArticle.js)
    useEffect(() => {
        setNumComments(commentsCount);
    }, [commentsCount]);

    return (
        <View style={styles.container}>
            <View><Text style={styles.header}>Comment Section</Text></View>
            {isLoggedIn ? (
                <View style={styles.inputContainer}>
                    <TextInput
                        value={newCommentText}
                        onChangeText={setNewCommentText}
                        placeholder="Add a comment"
                        placeholderTextColor={'grey'}
                        style={styles.input}
                        editable={true}
                    />
                    <TouchableOpacity style={styles.btn} onPress={addComment}>
                        <Text style={styles.btnText}>Submit Comment</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.inputContainer}>
                    <TextInput
                        editable={false}
                        placeholder="Sign in to comment the article"
                        placeholderTextColor={'white'}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('LoginScreen', { article: article })}>
                        <Text style={styles.btnText}>Sign in to comment</Text>
                    </TouchableOpacity>
                </View>
            )}
            <Text style={styles.commentCount}>Number of comments: {commentsCount}</Text>
            {comments.sort((a, b) => a.timestamp - b.timestamp).map((comment, index) => (
                <View key={index} style={styles.comment}>
                    <View style={styles.commentHeader}>
                        <Text style={styles.commentUser}>{comment.username}</Text>
                        <Text style={styles.timestamp}> {utilsConvertTimestamp(comment.timestamp)}</Text>
                    </View>
                    <View style={styles.commentBody}>
                        <Text style={styles.commentText}> {comment.text}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#111',
        margin: 10,
        borderRadius: 10,
        shadowColor: 'orange', // Set the shadow color to orange
        shadowOffset: { width: 0, height: 0 }, // Set the shadow offset
        shadowOpacity: 0.3, // Set the shadow opacity
        shadowRadius: 8, // Set the shadow radius
        elevation: 5, // This is needed for Android
    },
    header: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#707070',
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
        color: 'white',
        borderRadius: 5,
    },
    commentCount: {
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'orange',
    },
    comment: {
        marginBottom: 5,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    commentUser: {
        fontWeight: 'bold',
        color: 'white',
    },
    timestamp: {
        color: 'grey',
        fontSize: 12,
    },
    commentBody: {
        marginVertical: 5,
    },
    commentText: {
        color: 'white',
    },
    btn: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
    },
    btnText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});