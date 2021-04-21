import React, { useEffect, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import halfmoon from 'halfmoon';
import { config } from '../../config';

type SidebarType = 'overlayed-all' | 'overlayed-sm-and-down' | 'full-height';

interface MainLayoutProps {
    withNavbar?: boolean;
    withSidebar?: boolean;
    withNavbarFixedBottom?: boolean;
    sidebarType?: SidebarType[];
}

export const MainLayout = ({
    withSidebar,
    withNavbar,
    withNavbarFixedBottom,
    sidebarType,
    children,
}: PropsWithChildren<MainLayoutProps>) => {
    console.info('process.env', process.env);
    const location = useLocation();
    const { googleAnalyticsTraceId } = config;

    const handleClickOverlay = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        console.info('click overlay');
        halfmoon.toggleSidebar();
    };

    useEffect(() => {
        gtag('event', 'app_started', {
            debug_mode: process.env.NODE_ENV !== 'production',
        });
    }, []);

    useEffect(() => {
        gtag('event', 'page_view', {
            page_title: window.document.title,
            page_location: window.location.href,
            page_path: location.pathname,
            debug_mode: process.env.NODE_ENV !== 'production',
        });
    }, [location]);

    return (
        <React.Fragment>
            <Helmet defer={false}>
                <script
                    id="script-ga"
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTraceId}`}
                ></script>
                <script>{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsTraceId}'${
                    process.env.NODE_ENV !== 'production'
                        ? ", {'debug_mode': true}"
                        : ''
                });`}</script>
            </Helmet>
            <div
                className={`page-wrapper ${withNavbar ? ' with-navbar' : ''} ${
                    withNavbarFixedBottom ? ' with-navbar-fixed-bottom' : ''
                } ${withSidebar ? ' with-sidebar' : ''}`}
                data-sidebar-type={
                    withSidebar && sidebarType && sidebarType.length > 0
                        ? sidebarType.join(' ')
                        : ''
                }
            >
                {withSidebar &&
                    (sidebarType ?? []).find(
                        (x) =>
                            x === 'overlayed-all' ||
                            x === 'overlayed-sm-and-down',
                    ) && (
                        <div
                            className="sidebar-overlay"
                            onClick={handleClickOverlay}
                        ></div>
                    )}
                {children}
            </div>
        </React.Fragment>
    );
};
