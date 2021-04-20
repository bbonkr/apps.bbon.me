import React from 'react';

export interface Link {
    target?: string | '_blank' | '_self';
    href: string;
    icon?: React.ReactNode;
    title: React.ReactNode;
}
