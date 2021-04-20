export declare global {
    interface Window {
        GAID: string;
        app: {
            title?: string;
            version?: string;
            description?: string;
        };
    }
}
