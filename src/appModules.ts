import { AppModuleInfo } from './models/AppModuleInfo';
import { appInfo as textNormalizerInfo } from './components/TextNormalizerApp';
import { appInfo as guidGeneratorInfo } from './components/GuidGenertatorApp';
import { appInfo as jsonFormatterInfo } from './components/JsonFormatterApp';

export const appModules: AppModuleInfo[] = [
    textNormalizerInfo,
    guidGeneratorInfo,
    jsonFormatterInfo,
];
