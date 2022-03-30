import React, { PropsWithChildren, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface GoogleAnalyticsProviderProps {
    googleAnalyticsId?: string;
}

export const GoogleAnalyticsProvider = ({
    googleAnalyticsId,
    children,
}: PropsWithChildren<GoogleAnalyticsProviderProps>) => {
    const location = useLocation();

    useEffect(() => {
        if (googleAnalyticsId && typeof ga === 'function') {
            ga('send', 'event', 'app_started', 'app_started');
        }
    }, []);

    useEffect(() => {
        if (googleAnalyticsId && location && typeof ga === 'function') {
            ga('send', 'pageview', location.pathname);
        }
    }, [location]);

    return (
        <React.Fragment>
            {googleAnalyticsId && (
                <Helmet defer={false}>
                    <script
                        id="script-ga-head"
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
                    ></script>
                    <script id="script-ga-body">{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}'${
                        process.env.ENV !== 'production'
                            ? ", {'debug_mode': true}"
                            : ''
                    });`}</script>
                </Helmet>
            )}
            {children}
        </React.Fragment>
    );
};
