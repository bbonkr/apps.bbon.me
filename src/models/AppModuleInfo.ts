import React from 'react';

export interface AppModuleInfo {
    title: string;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    linkTo?: string;
    href?: string;
    target?: string;
}
