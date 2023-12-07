// useCommentArticle.js
import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc, increment } from "firebase/firestore";
import { FIREBASE_DB } from '../firebase';

export const useCommentArticle = (user, articleId) => {
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [commentsCount, setCommentsCount] = useState(0);

    useEffect(() => {
        const commentsRef = collection(FIREBASE_DB, 'Comments');
        const q = query(commentsRef, where("articleId", "==", articleId));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let commentsArray = [];
            querySnapshot.forEach((doc) => {
                commentsArray.push(doc.data());
            });
            setComments(commentsArray);
            setCommentsCount(commentsArray.length);
        });

        return () => unsubscribe();
    }, [articleId]);

    const addComment = async () => {
        if (newCommentText.trim() === '' || !user) return;
        const newComment = {
            userId: user.id,
            username: user.username,
            articleId,
            text: newCommentText,
            timestamp: Date.now()
        };
        await addDoc(collection(FIREBASE_DB, 'Comments'), newComment);
        const articleRef = doc(FIREBASE_DB, 'Articles', articleId);
        await updateDoc(articleRef, {
            comments: increment(1)
        });
        setNewCommentText('');
        console.log('UseCommentArticle : Comment added');
    };

    return { comments, newCommentText, setNewCommentText, addComment, commentsCount };
};