import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { AppModuleInfo } from '../../models/AppModuleInfo';
import { TextNormalizerApp } from './TextNormalizerApp';

export const appInfo: AppModuleInfo = {
    title: 'Text Normailzer',
    description: (
        <p>
            You can find some invisible characters in your string, and copy safe
            string that removed invisible characters.
        </p>
    ),
    linkTo: '/',
    icon: <FaPaperPlane />,
    app: <TextNormalizerApp />,
};
