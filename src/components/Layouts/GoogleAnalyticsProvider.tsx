import React, { PropsWithChildren, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface GoogleAnalyticsProviderProps {
    googleAnalyticsId?: string;
}

const GoogleAnalyticsProvider = ({
    googleAnalyticsId,
    children,
    location,
}: PropsWithChildren<GoogleAnalyticsProviderProps> & RouteComponentProps) => {
    useEffect(() => {
        if (googleAnalyticsId) {
            gtag('event', 'app_started', {
                debug_mode: process.env.ENV !== 'production',
            });
        }
    }, []);

    useEffect(() => {
        if (googleAnalyticsId && location) {
            gtag('event', 'page_view', {
                page_title: window.document.title,
                page_location: window.location.href,
                page_path: location.pathname,
                debug_mode: process.env.ENV !== 'production',
            });
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

export const GoogleAnalyticsProviderWithRouter = withRouter(
    GoogleAnalyticsProvider,
);
