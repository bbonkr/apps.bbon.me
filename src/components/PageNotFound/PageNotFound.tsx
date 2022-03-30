import React from 'react';
import { Location } from 'history';
import { Link, useLocation } from 'react-router-dom';
import { Content } from '../Layouts';

type LocationState = {
    from: { pathname?: string };
};

export const PageNotFound = () => {
    const { state } = useLocation();

    return (
        <Content title="404 | Page not found">
            <p>
                <code>
                    {(state as LocationState)?.from?.pathname ?? 'The page'}
                </code>{' '}
                does not exist.
            </p>
            <p>
                <Link to="/">Go to Home</Link>
            </p>
        </Content>
    );
};
