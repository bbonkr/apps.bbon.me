import React from 'react';
import { FaKey } from 'react-icons/fa';
import { AppModuleInfo } from '../../models/AppModuleInfo';
import { GuidGeneratorApp } from './GuidGeneratorApp';

export const appInfo: AppModuleInfo = {
    title: 'Guid Generator',
    description: 'Generate GUID v4',
    linkTo: '/guid',
    icon: <FaKey />,
    app: <GuidGeneratorApp />,
};
