import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { config } from '../../config';

export const GitHubRepositoryButton = () => {
    return (
        <a
            className="btn"
            href={config.gitHubRepositoryUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Navigate to GitHub repository"
        >
            <FaGithub />
        </a>
    );
};
