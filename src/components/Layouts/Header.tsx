import React from 'react';
import halfmoon from 'halfmoon';
import { FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { ThemeButton } from '../ThemeButton';

interface HeaderProps {}

interface RouteData {
    title: string;
    path: string;
}
const routes: RouteData[] = [
    {
        title: 'Introduction',
        path: '/introduction',
    },
    {
        title: 'Skill',
        path: '/skill',
    },
    {
        title: 'Education',
        path: '/education',
    },
    {
        title: 'Work',
        path: '/work',
    },
    {
        title: 'Project',
        path: '/project',
    },
    {
        title: 'Portfolio',
        path: '/portfolio',
    },
];

export const Header = () => {
    const location = useLocation();

    const handleClickMenuItem = () => {
        halfmoon.deactivateAllDropdownToggles();
    };

    const handleClickToggleSidebar = () => {
        console.info('click toggle sidebar');
        halfmoon.toggleSidebar();
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <button
                    className="btn btn-action"
                    type="button"
                    onClick={handleClickToggleSidebar}
                >
                    <FaBars />
                    <span className="sr-only">Toggle sidebar</span>
                </button>
            </div>
            <ul className="navbar-nav d-none d-md-flex">
                {routes.map((route) => {
                    return (
                        <li
                            key={route.path}
                            className={`nav-item ${
                                route.path === location.pathname ? 'active' : ''
                            }`}
                        >
                            <Link to={route.path} className="nav-link">
                                {route.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div className="navbar-nav d-none d-md-flex ml-auto">
                <ThemeButton />
            </div>
            {/* <!-- Navbar content (with the dropdown menu) --> */}
            <div className="navbar-content d-md-none ml-auto">
                {/* <!-- d-md-none = display: none on medium screens and up (width > 768px), ml-auto = margin-left: auto --> */}
                <div className="dropdown with-arrow">
                    <button
                        className="btn"
                        data-toggle="dropdown"
                        type="button"
                        id="navbar-dropdown-toggle-btn-1"
                    >
                        <FaBars />
                    </button>
                    <div
                        className="dropdown-menu dropdown-menu-right w-200"
                        aria-labelledby="navbar-dropdown-toggle-btn-1"
                    >
                        {routes.map((route) => {
                            return (
                                <Link
                                    key={route.path}
                                    to={route.path}
                                    className="dropdown-item active"
                                    onClick={handleClickMenuItem}
                                >
                                    {route.title}
                                </Link>
                            );
                        })}
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-item">
                            <ThemeButton />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
