import { Link } from './Link';

interface Author {
    name: string;
    email: string;
    url?: string;
}

export interface Config {
    title: string;
    description?: string;
    gitHubRepositoryUrl?: string;
    gitHubIssueUrl?: string;
    version?: string;
    author: Author;
    contacts?: Link[];
    googleAnalyticsTraceId?: string;
}
