import { useEffect, useState } from 'react';
import { FIREBASE_DB } from '../firebase'; // Your Firebase configuration

function useFetchArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const unsubscribe = FIREBASE_DB.collection('articles')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const newArticles = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setArticles(newPosts);
      });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return articles;
}