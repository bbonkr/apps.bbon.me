import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegPaperPlane, FaInfoCircle } from 'react-icons/fa';
import halfmoon from 'halfmoon';
import { config } from '../../config';

export const Sidebar = () => {
    const handleClickMenuItem = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        halfmoon.toggleSidebar();
    };

    return (
        <div className="sidebar">
            <div className="sidebar-menu">
                <Link to="/" className="sidebar-brand">
                    <img src="/bbon-icon.png" alt="Logo" />
                    {config.title}{' '}
                </Link>

                <div className="sidebar-content">
                    <p>{config.description}</p>
                </div>
                <h5 className="sidebar-title">PWAs</h5>
                <div className="sidebar-divider"></div>

                <Link
                    to="/"
                    className="sidebar-link sidebar-link-with-icon"
                    onClick={handleClickMenuItem}
                >
                    <span className="sidebar-icon">
                        <FaRegPaperPlane />
                    </span>
                    String Normailzer
                </Link>
                <br />
                <h5 className="sidebar-title">Information</h5>
                <div className="sidebar-divider"></div>
                <Link
                    to="/about"
                    className="sidebar-link sidebar-link-with-icon"
                    onClick={handleClickMenuItem}
                >
                    <span className="sidebar-icon">
                        <FaInfoCircle />
                    </span>
                    About
                </Link>
            </div>
        </div>
    );
};
