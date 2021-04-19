import { useState } from 'react';
import {
    StringReplaceModule,
    StringReplaceModuleResult,
    ZWSPStringReplaceModule,
} from '../lib';

export const useStringReplaceModule = () => {
    const modules: StringReplaceModule[] = [new ZWSPStringReplaceModule()];
    const [verifyResults, setVerifyResults] = useState<
        StringReplaceModuleResult[]
    >([]);
    const [replaceResult, setReplaceResult] = useState<
        StringReplaceModuleResult[]
    >([]);

    // const escapeHtml = (source: string): string => {};

    const escape = (source: string): string => {
        return source
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        // .replace(/"/g, '&quot;')
        // .replace(/'/g, '&#039;')
        // .replace(/ /g, '&nbsp;')
        // .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        // .replace(/(?:\r\n|\r|\n)/g, '<br />')
    };

    const unescape = (source: string): string => {
        return (
            source
                // .replace(/<br \/>/g, '\n')
                // .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
            // .replace(/&quot;/g, '"')
            // .replace(/&#039;/g, "'")
        );
    };

    const verify = (source: string) => {
        let newText = escape(source);
        const results: StringReplaceModuleResult[] = [];
        modules.forEach((module) => {
            const result = module.replace(
                newText,
                `<span class="badge badge-secondary m-1">${module.getLabel()}</span>$1`,
            );

            results.push(result);

            newText = result.text;
        });

        setVerifyResults((_) => {
            if (results.length > 0) {
                return [...results];
            }
            return [{ text: source, hit: false, label: 'None' }];
        });
    };

    const replace = (source: string) => {
        let newText = escape(source);
        const results: StringReplaceModuleResult[] = [];
        modules.forEach((module) => {
            const result = module.replace(newText, '');

            results.push(result);

            newText = result.text;
        });

        setReplaceResult((_) => {
            if (results.length > 0) {
                return [...results];
            }
            return [{ text: source, hit: false, label: 'None' }];
        });
    };

    return {
        verifyResults,
        replaceResult,
        verify,
        replace,
        escape,
        unescape,
    };
};

type UseStringReplaceModuleHook = typeof useStringReplaceModule;
export type UseStringReplaceModule = ReturnType<UseStringReplaceModuleHook>;
