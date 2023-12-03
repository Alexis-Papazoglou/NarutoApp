import { useState, useEffect } from 'react';

const useFetchAllCharacters = (limit = 20) => {
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchCharacters = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://dattebayo-api.onrender.com/characters?limit=${limit}&page=${page}`);
            const json = await response.json();
            setCharacters(prevCharacters => [...prevCharacters, ...json.characters]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    return { characters, error, loading, fetchMore: fetchCharacters };
};

export default useFetchAllCharacters;