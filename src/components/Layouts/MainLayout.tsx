import React, { useEffect, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGa from 'react-ga';
import halfmoon from 'halfmoon';

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
    const location = useLocation();

    const handleClickOverlay = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        console.info('click overlay');
        halfmoon.toggleSidebar();
    };

    useEffect(() => {
        ReactGa.initialize(window.GAID);
        ReactGa.pageview(location.pathname);
    }, []);

    useEffect(() => {
        ReactGa.pageview(location.pathname);
    }, [location]);

    return (
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
                        x === 'overlayed-all' || x === 'overlayed-sm-and-down',
                ) && (
                    <div
                        className="sidebar-overlay"
                        onClick={handleClickOverlay}
                    ></div>
                )}
            {children}
        </div>
    );
};
