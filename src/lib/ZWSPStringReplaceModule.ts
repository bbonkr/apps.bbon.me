import {
    StringReplaceModule,
    StringReplaceModuleResult,
} from './StringReplaceModule';

/**
 * Replace ZWSP <small>zero width space</small>.
 *
 * [ZWSP <small>zero width space</small>](https://en.wikipedia.org/wiki/Zero-width_space) is a non-printing character used in computerized typesetting to indicate word boundaries to text processing systems when using scripts that do not use explicit spacing, or after characters (such as the slash) that are not followed by a visible space but after which there may nevertheless be a line break.
 */
export class ZWSPStringReplaceModule implements StringReplaceModule {
    public replace(source: string, replacer = ''): StringReplaceModuleResult {
        const pattern = /([\u200b])/g;

        const regex = new RegExp(pattern);
        const hit = regex.test(source);
        return {
            label: this.getLabel(),
            text: source.replace(pattern, replacer),
            hit: hit,
        };
    }

    public getLabel() {
        return 'ZWSP';
    }
}
