import React from 'react';
import { FaKey } from 'react-icons/fa';
import { AppModuleInfo } from '../../models/AppModuleInfo';
import { AsyncComponent, LoadingComponent } from '../AsyncComponent';
// import { GuidGeneratorApp } from './GuidGeneratorApp';

const GuidGeneratorApp = AsyncComponent(() => import('./GuidGeneratorApp'), {
    resolveComponent: (props) => props.GuidGeneratorApp,
    fallback: <LoadingComponent />,
});

export const appInfo: AppModuleInfo = {
    title: 'Guid Generator',
    description: 'Generate GUID v4',
    linkTo: '/guid',
    icon: <FaKey />,
    app: <GuidGeneratorApp />,
};
