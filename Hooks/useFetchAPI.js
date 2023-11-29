import { useState, useEffect } from 'react';

const useFetchAPI = (endpoint) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://dattebayo-api.onrender.com/${endpoint}`)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => setError(error));
    }, [endpoint]);

    return { data, error };
};

export default useFetchAPI;