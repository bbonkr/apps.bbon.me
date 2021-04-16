interface Author {
    name: string;
    email: string;
    url?: string;
}

export interface Config {
    title: string;
    version?: string;
    author: Author;
}
