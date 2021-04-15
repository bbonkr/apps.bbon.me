import React from 'react';
import { Link } from '../../models';
import { FaExternalLinkAlt } from 'react-icons/fa';
import halfmoon from 'halfmoon';

interface GenericLinkProps {
    record: Link;
    className?: string;
}

export const GenericLink = ({ record, className }: GenericLinkProps) => {
    const handleClick = () => {
        halfmoon.deactivateAllDropdownToggles();
    };

    return (
        <a
            className={`d-flex flex-row flex-justify-center flex-align-baseline ${
                className ?? ''
            }`}
            href={record.href}
            target={record.target || '_blank'}
            onClick={handleClick}
        >
            {record.icon && <span className="mr-5">{record.icon} </span>}
            <span className="mr-5">{record.title}</span>
            {(!record.target || record.target !== '_self') && (
                <span>
                    <FaExternalLinkAlt />
                </span>
            )}
        </a>
    );
};
