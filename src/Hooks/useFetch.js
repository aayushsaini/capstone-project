import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
    
    const [ data, setData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isError, setIsError ] = useState(false);

    useEffect(() => {
        const abort = new AbortController();
        axios.get(url, { signal: abort.signal})
            .then((res) => {
                // console.log(res);
                setData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                if (err.name === "AbortError") {
                    return;
                } else {
                    setIsLoading(false);
                    setIsError(true);
                }
            })
            return () => abort.abort();
    }, [url])

    return { data, isLoading, isError }
}

export default useFetch;