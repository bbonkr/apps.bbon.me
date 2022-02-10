import React from 'react';
import { FaLink } from 'react-icons/fa';
import { AppModuleInfo } from '../../models/AppModuleInfo';
import { AsyncComponent, LoadingComponent } from '../AsyncComponent';

const FeatureApp = AsyncComponent(() => import('./UriApp'), {
    // resolveComponent: (props) => props.TextNormalizerApp,
    fallback: <LoadingComponent />,
});

export const appInfo: AppModuleInfo = {
    title: 'Uri Tools',
    description: 'Uri string encoding, decoding',
    linkTo: '/uritools',
    icon: <FaLink />,
    app: <FeatureApp />,
};
