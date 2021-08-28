import React from 'react';
import { FaQrcode } from 'react-icons/fa';
import { AppModuleInfo } from '../../models/AppModuleInfo';
import { AsyncComponent, LoadingComponent } from '../AsyncComponent';

const QrCodeGeneratorApp = AsyncComponent(() => import('./QrCodeGenerator'), {
    resolveComponent: (props) => props.QrCodeGenerator,
    fallback: <LoadingComponent />,
});

export const appInfo: AppModuleInfo = {
    title: 'Qr Code',
    description: 'Qr code generator',
    linkTo: '/qrcode',
    icon: <FaQrcode />,
    app: <QrCodeGeneratorApp />,
};
