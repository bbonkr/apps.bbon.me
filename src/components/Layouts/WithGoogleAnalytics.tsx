import React, { ComponentType, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { CoomponentHelper } from '../../lib/ComponentHelper';

interface WithGoogleAnalyticsProps {
    googleAnalyticsId?: string;
}

export const withGoogleAnalytics =
    <TInputComponentProps,>(
        props: WithGoogleAnalyticsProps & TInputComponentProps,
    ) =>
    (InputComponent: ComponentType<TInputComponentProps>) => {
        const { googleAnalyticsId } = props;
        delete props.googleAnalyticsId;
        const helper = new CoomponentHelper();

        const OutputComponent = () => {
            const location = useLocation();

            useEffect(() => {
                gtag('event', 'app_started', {
                    debug_mode: process.env.ENV !== 'production',
                });
            }, []);

            useEffect(() => {
                gtag('event', 'page_view', {
                    page_title: window.document.title,
                    page_location: window.location.href,
                    page_path: location.pathname,
                    debug_mode: process.env.ENV !== 'production',
                });
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
                    <InputComponent {...props} />
                </React.Fragment>
            );
        };

        OutputComponent.displayName = `WithGoogleAnalytics(${helper.getDisplayName(
            InputComponent,
        )})`;

        return OutputComponent;
    };

type WithGoogleAnalyticsHoc = typeof withGoogleAnalytics;
export type WithGoogleAnalytics = ReturnType<WithGoogleAnalyticsHoc>;
