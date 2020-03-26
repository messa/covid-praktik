import React, {useCallback, useEffect} from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

import './styles.scss';

function RouterProgress({startPosition = .3, stopDelayMs = 200}) {
    let timer = null;

    const routeChangeStart = useCallback(() => {
        NProgress.set(startPosition);
        NProgress.start();
    }, [startPosition]);

    const routeChangeEnd = useCallback(() => {
        clearTimeout(timer);
        timer = setTimeout(() => NProgress.done(true), stopDelayMs);
    }, [stopDelayMs]);

    useEffect(() => {
        Router.events.on('routeChangeStart', routeChangeStart);
        Router.events.on('routeChangeComplete', routeChangeEnd);
        Router.events.on('routeChangeError', routeChangeEnd);
    }, []);

    return null;
}

export default RouterProgress;