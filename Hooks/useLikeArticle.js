import { useState, useEffect, useRef } from 'react';
import { doc, getDoc, addDoc, deleteDoc, collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from '../firebase';

// this hook will fetch the article from the database and return the likes count and a function to update the likes count
export const useLikeArticle = (userId, articleId) => {
    const [likeDoc, setLikeDoc] = useState(null);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (!userId) {
            setLikeDoc(null);
            return;
        }

        const fetchLike = async () => {
            const likesCollectionRef = collection(FIREBASE_DB, 'Likes');
            const likeSnap = await getDocs(query(likesCollectionRef, where('userId', '==', userId), where('articleId', '==', articleId)));
            if (!likeSnap.empty && isMounted.current) {
                setLikeDoc(likeSnap.docs[0]);
            }
        };

        fetchLike();
    }, [userId, articleId]);

    const handleLike = async () => {
        if (!userId) {
            return;
        }

        const articleRef = doc(FIREBASE_DB, 'Articles', articleId);

        if (likeDoc && likeDoc.exists) {
            await deleteDoc(likeDoc.ref);
            setLikeDoc(null);
            return false; // Article was disliked
        } else {
            const likeRef = await addDoc(collection(FIREBASE_DB, 'Likes'), {
                userId: userId,
                articleId: articleId,
            });
            const newLikeSnap = await getDoc(likeRef);
            if (isMounted.current) {
                setLikeDoc(newLikeSnap);
            }
            return true; // Article was liked
        }
    };

    return { likeDoc, handleLike };
};