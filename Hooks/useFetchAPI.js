import { useState, useEffect } from 'react';

const useFetchAPI = (endpoint, params = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // Convert params object to a string of query parameters
    const queryString = Object.keys(params)
        .map(key => key + '=' + params[key])
        .join('&');

    useEffect(() => {
        fetch(`https://dattebayo-api.onrender.com/${endpoint}?${queryString}`)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => setError(error));
    }, [endpoint, queryString]);

    return { data, error };
};

export default useFetchAPI;