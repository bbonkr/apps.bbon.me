import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { config } from '../../config';

export const GitHubIssueButton = () => {
    return (
        <a
            className="btn"
            href={`${config.gitHubRepositoryUrl}${config.gitHubIssueUrl}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Navigate to GitHub issue"
        >
            <FaExclamationCircle />
        </a>
    );
};
