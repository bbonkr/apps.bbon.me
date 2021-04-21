export declare global {
    interface PageViewParameter {
        page_title: string;
        page_location: string;
        page_path: string;
    }

    interface Window {
        gtag: (
            action: string,
            gaId: string,
            parameter: PageViewParameter,
        ) => void;
    }
}
