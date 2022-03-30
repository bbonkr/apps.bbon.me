import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import halfmoon from 'halfmoon';
import { AsyncComponent, LoadingComponent } from '../AsyncComponent';
import {
    MainLayout,
    ContentWrapper,
    Footer,
    Sidebar,
    GoogleAnalyticsProvider,
} from '../Layouts';
import { Position } from '../../models';
import smoothscroll from 'smoothscroll-polyfill';
import { appModules } from '../../appModules';
import { useNotification } from '../../hooks';
import { config } from '../../config';
import { Redirect } from '../Redirect';

const Header = AsyncComponent(() => import('../Layouts'), {
    resolveComponent: (props) => props.Header,
    fallback: <LoadingComponent />,
});

const About = AsyncComponent(() => import('../About'), {
    resolveComponent: (props) => props.About,
    fallback: <LoadingComponent />,
});

const PageNotFound = AsyncComponent(() => import('../PageNotFound'), {
    resolveComponent: (props) => props.PageNotFound,
    fallback: <LoadingComponent />,
});

const helmetContext = {};

export const App = () => {
    const { googleAnalyticsTraceId, title, version } = config;

    const { requestPermission } = useNotification();
    const [scrollPosition, setScrollPosition] = useState<Position>({
        top: 0,
        left: 0,
    });

    const handleClickScrollTop = () => {
        setScrollPosition((prevState) => ({
            ...prevState,
            top: 0,
            left: 0,
        }));
    };

    useEffect(() => {
        halfmoon.onDOMContentLoaded();
        smoothscroll.polyfill();

        const handleWindowLoad = () => {
            navigator.serviceWorker
                .getRegistrations()
                .then((registerations) => {
                    if (!registerations || registerations.length === 0) {
                        return navigator.serviceWorker.register(
                            '/service-worker.js',
                        );
                    } else {
                        registerations.forEach((r) => {
                            return r.update();
                        });
                    }
                })
                .then((registration) => {
                    if (registration) {
                        console.info(
                            `SW registered: ${registration}, scope: ${registration.scope} `,
                        );
                    }
                })
                .catch((err) => {
                    console.info('SW registration failed: ', err);
                });

            requestPermission().then((result) => {
                console.info(`Notifiction ${result}`);
            });
        };

        if (process.env.ENV === 'production' && 'serviceWorker' in navigator) {
            window.addEventListener('load', handleWindowLoad);
        }

        console.info('🌈 App started. 🌠');

        return () => {
            window.removeEventListener('load', handleWindowLoad);
        };
    }, []);

    return (
        <HelmetProvider context={helmetContext}>
            <Helmet titleTemplate={`%s | ${title} ${version}`}>
                <body
                    data-set-preferred-mode-onload="true"
                    className="with-custom-webkit-scrollbars with-custom-css-scrollbars"
                    data-dm-shortcut-enabled="true"
                    data-sidebar-shortcut-enabled="true"
                />
                <title>Home</title>
            </Helmet>

            <Router>
                <GoogleAnalyticsProvider
                    googleAnalyticsId={googleAnalyticsTraceId}
                >
                    <MainLayout
                        withNavbar
                        withNavbarFixedBottom
                        withSidebar
                        sidebarType={['overlayed-all']}
                    >
                        <Sidebar />
                        <Header />

                        <ContentWrapper scrollPosition={scrollPosition}>
                            <Routes>
                                {appModules
                                    .filter((app) => Boolean(app.linkTo))
                                    .map((app) => (
                                        <Route
                                            key={app.title}
                                            path={app.linkTo ?? ''}
                                            element={app.app}
                                        />
                                    ))}
                                <Route path="/about" element={<About />} />
                                <Route path="/404" element={<PageNotFound />} />
                                <Route
                                    path="*"
                                    element={<Redirect path="/404" replace />}
                                />
                            </Routes>
                        </ContentWrapper>

                        <Footer onClickScrollToTop={handleClickScrollTop} />
                    </MainLayout>
                </GoogleAnalyticsProvider>
            </Router>
        </HelmetProvider>
    );
};
