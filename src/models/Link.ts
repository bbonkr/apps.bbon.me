import React from 'react';

export interface Link {
    target: string | '_blank' | '_self' | undefined;
    href: string;
    icon?: React.ReactNode;
    title: string;
}
