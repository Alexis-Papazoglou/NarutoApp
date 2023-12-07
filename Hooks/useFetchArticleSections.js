// useFetchArticleSections.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from '../firebase';

export const useFetchArticleSections = (articleId) => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const sectionsRef = collection(FIREBASE_DB, 'Articles', articleId, 'sections');
                const sectionsSnap = await getDocs(sectionsRef);
                const sectionsData = sectionsSnap.docs.map(doc => doc.data());
                setSections(sectionsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sections:', error);
                setLoading(false);
            }
        };

        fetchSections();
    }, [articleId]);

    return { sections, loading };
};