import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FIREBASE_DB } from '../../firebase';
import { collection, where, getDocs, doc, getDoc, deleteDoc, query, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { utilsConvertTimestamp } from '../../utils';

export default function LikedAndCommented({ user }) {
    const [likedArticles, setLikedArticles] = useState([]);
    const [userComments, setUserComments] = useState([]);

    useEffect(() => {
        const q = query(collection(FIREBASE_DB, 'Likes'), where('userId', '==', user.id));
        getDocs(q)
            .then(querySnapshot => {
                const articleIds = querySnapshot.docs.map(doc => doc.data().articleId);
                return Promise.all(articleIds.map(id => getDoc(doc(FIREBASE_DB, 'Articles', id))));
            })
            .then(articleDocs => {
                const articles = articleDocs.map(doc => doc.data());
                setLikedArticles(articles);
            });
    }, [user]);

    useEffect(() => {
        const q = query(collection(FIREBASE_DB, 'Comments'), where('userId', '==', user.id));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const commentData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            Promise.all(commentData.map(comment =>
                getDoc(doc(FIREBASE_DB, 'Articles', comment.articleId))
                    .then(articleDoc => ({ ...comment, articleName: articleDoc.data().title }))
            ))
                .then(comments => {
                    const groupedComments = comments.reduce((grouped, comment) => {
                        (grouped[comment.articleId] = grouped[comment.articleId] || []).push(comment);
                        return grouped;
                    }, {});
                    setUserComments(groupedComments);
                });
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, [user]);

    const deleteComment = (commentId, articleId) => {
        Alert.alert(
            "Delete Comment",
            "Are you sure you want to delete this comment?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete", style: "destructive", onPress: () => {
                        deleteDoc(doc(FIREBASE_DB, 'Comments', commentId))
                            .then(() => {
                                console.log('Comment deleted');
                                // Decrease the comments count in the Article
                                const articleRef = doc(FIREBASE_DB, 'Articles', articleId);
                                updateDoc(articleRef, {
                                    comments: increment(-1)
                                });
                            });
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liked Articles:</Text>
            {likedArticles.map((article, index) => (
                <Text key={index} style={styles.article}>• {article.title}</Text>
            ))}
            <Text style={styles.title}>User Comments:</Text>
            {Object.entries(userComments).map(([articleId, comments], index) => (
                <View key={index}>
                    {comments.length > 0 && (
                        <View style={styles.articleNameContainer}>
                            <Text style={styles.articleLabel}>• Article: </Text>
                            <Text style={styles.articleName}>{comments[0].articleName}</Text>
                        </View>
                    )}
                    {comments.map((comment, index) => (
                        <View key={index} style={styles.commentContainer}>
                            <Text style={styles.comment}>• {comment.text}</Text>
                            <View style={styles.timestampAndTrashcan}>
                                <Text style={styles.timestamp}>{utilsConvertTimestamp(comment.timestamp)}</Text>
                                <FontAwesome style={styles.trashIcon} name='trash-o' size={18} color='orange' onPress={() => deleteComment(comment.id, comment.articleId)} />
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111',
        margin: 10,
        padding: 10,
        width: '100%',
        borderRadius: 10,
        shadowColor: 'orange',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        color: 'orange',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    article: {
        color: 'white',
        marginBottom: 5,
    },
    commentContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginLeft: 16,
        marginBottom: 10,
    },
    comment: {
        color: 'white',
    },
    timestampAndTrashcan: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginVertical: 2,
    },
    timestamp: {
        marginLeft: 8,
        color: 'grey',
    },
    articleNameContainer: {
        paddingBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    articleLabel: {
        fontSize: 16,
        color: 'orange',
    },
    articleName: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    trashIcon: {
        marginLeft: 10,
    },
});
