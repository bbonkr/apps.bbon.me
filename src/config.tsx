import React from 'react';
import { Config } from './models';
import { FaBlog, FaGithub, FaFacebook, FaTwitter } from 'react-icons/fa';

export const config: Config = {
    title: process.env.TITLE ?? '',
    gitHubRepositoryUrl: 'https://github.com/bbonkr/apps.bbon.me',
    gitHubIssueUrl: '/issues',
    version: `v${process.env.VERSION || '1.0.0'}`,
    description: process.env.DESCRIPTION,
    googleAnalyticsTraceId: process.env.GAID,
    author: {
        name: 'bbon',
        email: 'dev@bbon.kr',
        url: 'https://bbon.kr',
    },
    contacts: [
        {
            title: 'Blog',
            href: 'https://bbon.kr',
            target: 'external',
            icon: <FaBlog />,
        },
        {
            title: 'GitHub',
            href: 'https://github.com/bbonkr',
            target: 'external',
            icon: <FaGithub />,
        },
        {
            title: 'Facebook',
            href: 'https://facebook.com/bbonkr',
            target: 'external',
            icon: <FaFacebook />,
        },
        {
            title: 'Twitter',
            href: 'https://twitter.com/bbonkr',
            target: 'external',
            icon: <FaTwitter />,
        },
    ],
};
