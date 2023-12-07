import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { FIREBASE_DB } from '../firebase';

// This hook will fetch the article from the database and return it to the component that calls it.
export const useFetchArticle = (articleId) => {
    const [article, setArticle] = useState(null);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        const fetchArticle = async () => {
            const articleRef = doc(FIREBASE_DB, 'Articles', articleId);
            const articleSnap = await getDoc(articleRef);
            if (articleSnap.exists()) {
                setArticle(articleSnap.data());
                setLikesCount(articleSnap.data().likes || 0);
            }
        };

        fetchArticle();
    }, [articleId]);

    const updateLikes = async (incrementValue) => {
        const articleRef = doc(FIREBASE_DB, 'Articles', articleId);
        await updateDoc(articleRef, { likes: increment(incrementValue) });
        setLikesCount((count) => count + incrementValue);
    };

    return { article, likesCount, updateLikes };
};