import React, { useEffect } from 'react';
import halfmoon from 'halfmoon';
import { FaBars } from 'react-icons/fa';
import { ThemeButton } from '../ThemeButton';
import { GitHubIssueButton, GitHubRepositoryButton } from '../GitHubButtons';
import { GenericLink } from '../GenericLink';
import { useConfig } from '../../hooks';

export const Header = () => {
    const { title, version } = useConfig();
    const handleClickToggleSidebar = () => {
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
            <GenericLink
                className="navbar-brand"
                link={{
                    href: '/',
                    title: (
                        <React.Fragment>
                            <img src="/bbon-icon.png" alt={title} /> {title}
                        </React.Fragment>
                    ),
                }}
                disableToggleSidebar
            />

            {version && (
                <span className="navbar-text text-monospace">{version}</span>
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
