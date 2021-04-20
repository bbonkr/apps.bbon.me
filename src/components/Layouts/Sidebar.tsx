import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { config } from '../../config';
import { appModules } from '../../appModules';
import { GenericLink } from '../GenericLink';
import { useConfig } from '../../hooks';

export const Sidebar = () => {
    const { title, version, description } = useConfig();

    return (
        <div className="sidebar">
            <div className="sidebar-menu">
                <GenericLink
                    className="sidebar-brand"
                    link={{
                        href: '/',
                        title: (
                            <React.Fragment>
                                <img src="/bbon-icon.png" alt="Logo" /> {title}
                            </React.Fragment>
                        ),
                    }}
                />
                <div className="sidebar-content">
                    <p>{description}</p>
                </div>
                <h5 className="sidebar-title">PWAs</h5>
                <div className="sidebar-divider"></div>

                {appModules.map((app) => (
                    <GenericLink
                        key={app.linkTo}
                        className={`sidebar-link sidebar-link-with-icon`}
                        link={{
                            href: app.linkTo ?? '/',
                            title: (
                                <React.Fragment>
                                    {app.icon && (
                                        <span className="sidebar-icon">
                                            {app.icon}
                                        </span>
                                    )}
                                    {app.title}
                                </React.Fragment>
                            ),
                        }}
                    />
                ))}
                <br />
                <h5 className="sidebar-title">Information</h5>
                <div className="sidebar-divider"></div>
                <GenericLink
                    className="sidebar-link sidebar-link-with-icon"
                    link={{
                        href: '/about',
                        title: (
                            <React.Fragment>
                                <span className="sidebar-icon">
                                    <FaInfoCircle />
                                </span>
                                About
                            </React.Fragment>
                        ),
                    }}
                />
            </div>
        </div>
    );
};
