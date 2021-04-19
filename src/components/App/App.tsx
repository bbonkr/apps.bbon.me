import React, { useEffect, useState } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import halfmoon from 'halfmoon';
import { AsyncComponent, LoadingComponent } from '../AsyncComponent';
import { MainLayout, ContentWrapper, Footer, Sidebar } from '../Layouts';
import { Position, Theme } from '../../models';
import smoothscroll from 'smoothscroll-polyfill';
import { Loading } from '../Loading';
import { appModules } from '../../appModules';
import { useNotification } from '../../hooks';

const Header = AsyncComponent(() => import('../Layouts'), {
    resolveComponent: (props) => props.Header,
    fallback: <LoadingComponent />,
});

const StringNormalizer = AsyncComponent(() => import('../TextNormalizerApp'), {
    resolveComponent: (props) => props.TextNormalizerApp,
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

export const App = () => {
    const { requestPermission } = useNotification();
    const [scrollPosition, setScrollPosition] = useState<Position>({
        top: 0,
        left: 0,
    });
    const [theme, setTheme] = useState<Theme>(undefined);
    const handleClickScrollTop = () => {
        setScrollPosition((prevState) => ({
            ...prevState,
            top: 0,
            left: 0,
        }));
    };

    useEffect(() => {
        const bodyEl = document.querySelector('body');

        if (bodyEl) {
            bodyEl.setAttribute(
                'class',
                'with-custom-webkit-scrollbars with-custom-css-scrollbars',
            );
            bodyEl.setAttribute('data-set-preferred-theme-onload', 'true');
        }

        halfmoon.onDOMContentLoaded();
        smoothscroll.polyfill();

        const currentTheme = halfmoon.readCookie('halfmoon_preferredMode');
        console.info('halfmoon_preferredMode: ', currentTheme);
        setTheme((_) => (currentTheme as Theme) ?? 'light-mode');

        if (currentTheme === 'dark-mode' && halfmoon.darkModeOn === 'no') {
            halfmoon.toggleDarkMode();
        }

        const handleWindowLoad = () => {
            navigator.serviceWorker
                .getRegistrations()
                .then((registerations) => {
                    if (registerations.length === 0) {
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
                        console.log('SW registered: ', registration);
                    }
                })
                .catch((err) => {
                    console.log('SW registration failed: ', err);
                });

            requestPermission().then((result) => {
                console.info(`Notifiction ${result}`);
            });
        };

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', handleWindowLoad);
        }

        console.info('🌈 App started. 🌠');

        return () => {
            window.removeEventListener('load', handleWindowLoad);
        };
    }, []);

    return (
        <Router>
            {theme ? (
                <MainLayout
                    withNavbar
                    withNavbarFixedBottom
                    withSidebar
                    sidebarType={['overlayed-all']}
                >
                    <Sidebar />
                    <Header />
                    <ContentWrapper scrollPosition={scrollPosition}>
                        <Switch>
                            {appModules.map((app) => (
                                <Route key={app.title} path={app.linkTo} exact>
                                    {app.app}
                                </Route>
                            ))}

                            <Route path="/about" exact>
                                <About />
                            </Route>
                            <Route path="/404" exact>
                                <PageNotFound />
                            </Route>
                            <Route
                                path="*"
                                render={(props) => (
                                    <Redirect
                                        to={{
                                            pathname: '/404',
                                            state: { from: props.location },
                                        }}
                                    />
                                )}
                            ></Route>
                        </Switch>
                    </ContentWrapper>
                    <Footer onClickScrollToTop={handleClickScrollTop} />
                </MainLayout>
            ) : (
                <Loading />
            )}
        </Router>
    );
};
