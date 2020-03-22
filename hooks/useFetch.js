import {useRef, useEffect, useState} from 'react';
import axios from 'axios';

const initialState = {
    payload: null,
    error: null,
    loading: false,
    done: false,
};

export default function useFetch(url, initialPayload = null) {
    const isCurrent = useRef(true);
    const [state, setState] = useState({...initialState, payload: initialPayload});

    useEffect(() => () => isCurrent.current = false, []);

    const fetch = (method, data) => {
        setState({...initialState, loading: true});

        axios[method](url, data, {
            validateStatus: function (status) {
                return status >= 200 && status < 500;
            },
        })
            .then(payload => {
                if (!isCurrent.current) {
                    return;
                }

                const error = payload.status >= 400;

                setState(state => ({
                    ...state,
                    error: error ? payload.data.error || `${payload.status}: ${payload.statusText}` : null,
                    payload: error ? null : payload,
                    loading: false,
                    done: true,
                }));
            })
            .catch(e => {
                if (!isCurrent.current) {
                    return;
                }

                setState(state => ({
                    ...state,
                    error: e.message,
                    loading: false,
                    done: true,
                }));
            });
    };

    return {
        state,
        fetch,
    };
}