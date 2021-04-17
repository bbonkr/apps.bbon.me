import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { AppModuleInfo } from '../../models/AppModuleInfo';
import { JsonFormatterApp } from './JsonFormatterApp';

export const appInfo: AppModuleInfo = {
    title: 'Json Formatter',
    description: <p>Easy to read json formatter</p>,
    linkTo: '/json-formatter',
    icon: <FaQuoteLeft />,
    app: <JsonFormatterApp />,
};
