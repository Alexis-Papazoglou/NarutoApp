import { useState, useEffect } from 'react';

const useFetchAllClans = (limit = 20) => {
    const [clans, setClans] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchClans = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://dattebayo-api.onrender.com/clans?limit=${limit}&page=${page}`);
            const json = await response.json();
            setClans(prevClans => [...prevClans, ...json.clans]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClans();
    }, []);

    return { clans, error, loading, fetchMore: fetchClans };
};

export default useFetchAllClans;