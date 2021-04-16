export interface StringReplaceModuleResult {
    label: string;
    text: string;
    hit: boolean;
}
export interface StringReplaceModule {
    replace(source: string, replacer: string): StringReplaceModuleResult;
    getLabel(): string;
}
