import React from 'react';
import { Link as LinkModel } from '../../models';
import { FaExternalLinkAlt } from 'react-icons/fa';
import halfmoon from 'halfmoon';
import { Link } from 'react-router-dom';

interface GenericLinkProps {
    link: LinkModel;
    className?: string;
    disableToggleSidebar?: boolean;
    disableToggleDropdown?: boolean;
}

export const GenericLink = ({
    link,
    className,
    disableToggleSidebar,
    disableToggleDropdown,
}: GenericLinkProps) => {
    const handleClick = () => {
        if (!disableToggleDropdown) {
            halfmoon.deactivateAllDropdownToggles();
        }
        if (!disableToggleSidebar) {
            halfmoon.toggleSidebar();
        }
    };

    return link.href.startsWith('/') ? (
        <Link to={link.href} onClick={handleClick} className={className ?? ''}>
            {link.title}
        </Link>
    ) : (
        <a
            className={`d-flex flex-row flex-justify-center flex-align-baseline ${
                className ?? ''
            }`}
            href={link.href}
            target={link.target || '_blank'}
            onClick={handleClick}
        >
            {link.icon && <span className="mr-5">{link.icon} </span>}
            <span className="mr-5">{link.title}</span>
            {(!link.target || link.target !== '_self') && (
                <span>
                    <FaExternalLinkAlt />
                </span>
            )}
        </a>
    );
};
