import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { AppModuleInfo } from '../../models/AppModuleInfo';
import { AsyncComponent, LoadingComponent } from '../AsyncComponent';
// import { JsonFormatterApp } from './JsonFormatterApp';

const JsonFormatterApp = AsyncComponent(() => import('./JsonFormatterApp'), {
    // resolveComponent: (props) => props.JsonFormatterApp,
    fallback: <LoadingComponent />,
});

export const appInfo: AppModuleInfo = {
    title: 'Json Formatter',
    description: 'Easy to read json formatter.',
    linkTo: '/json-formatter',
    icon: <FaQuoteLeft />,
    app: <JsonFormatterApp />,
};
