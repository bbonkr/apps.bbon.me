import React, { useEffect } from 'react';
import halfmoon from 'halfmoon';
import { FaBars } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { ThemeButton } from '../ThemeButton';
import { config } from '../../config';
import { GitHubIssueButton, GitHubRepositoryButton } from '../GitHubButtons';

export const Header = () => {
    const location = useLocation();

    const handleClickMenuItem = () => {
        halfmoon.deactivateAllDropdownToggles();
    };

    const handleClickToggleSidebar = () => {
        console.info('click toggle sidebar');
        halfmoon.toggleSidebar();
    };

    useEffect(() => {
        halfmoon.onDOMContentLoaded();
    }, []);

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
            <a href="/" className="navbar-brand">
                <img src="/bbon-icon.png" alt={config.title} />
                {config.title}{' '}
            </a>
            {config.version && (
                <span className="navbar-text text-monospace">
                    {config.version}
                </span>
            )}

            <div className="navbar-nav ml-auto">
                <div
                    className="btn-group mr-5"
                    role="group"
                    aria-label="feature buttons"
                >
                    <GitHubIssueButton />
                    <GitHubRepositoryButton />
                </div>
                <ThemeButton />
            </div>
        </nav>
    );
};
