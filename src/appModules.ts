import { AppModuleInfo } from './models/AppModuleInfo';
import { appInfo as textNormalizerInfo } from './components/TextNormalizerApp';
import { appInfo as guidGeneratorInfo } from './components/GuidGenertatorApp';

export const appModules: AppModuleInfo[] = [
    textNormalizerInfo,
    guidGeneratorInfo,
];
