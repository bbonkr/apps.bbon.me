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

const Header = AsyncComponent(() => import('../Layouts'), {
    resolveComponent: (props) => props.Header,
    fallback: <LoadingComponent />,
});

const StringNormalizer = AsyncComponent(() => import('../StringNormalizer'), {
    resolveComponent: (props) => props.StringNormalizer,
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

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('/service-worker.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                        console.log(
                            'SW registration failed: ',
                            registrationError,
                        );
                    });
            });
        }

        console.info('🌈 App started. 🌠');
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
                            <Route path="/" exact>
                                <StringNormalizer />
                            </Route>
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
                    <Footer />
                </MainLayout>
            ) : (
                <Loading />
            )}
        </Router>
    );
};
