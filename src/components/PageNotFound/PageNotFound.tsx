import React from 'react';
import { Location } from 'history';
import { Link, useLocation } from 'react-router-dom';
import { Content } from '../Layouts';

interface LocationState {
    from: Location;
}

export const PageNotFound = () => {
    const { state } = useLocation<LocationState>();

    return (
        <Content title="404 | Page not found">
            <p>
                <code>{state?.from?.pathname ?? 'The page'}</code> does not
                exist.
            </p>
            <p>
                <Link to="/">Go to Home</Link>
            </p>
        </Content>
    );
};
