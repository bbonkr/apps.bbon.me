import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { AppModuleInfo } from '../../models/AppModuleInfo';
import { AsyncComponent, LoadingComponent } from '../AsyncComponent';

const TextNormalizerApp = AsyncComponent(() => import('./TextNormalizerApp'), {
    // resolveComponent: (props) => props.TextNormalizerApp,
    fallback: <LoadingComponent />,
});

export const appInfo: AppModuleInfo = {
    title: 'Text Normailzer',
    description:
        'You can find some invisible characters in your string, and copy safe string that removed invisible characters.',
    linkTo: '/',
    icon: <FaPaperPlane />,
    app: <TextNormalizerApp />,
};
