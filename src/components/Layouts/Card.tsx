import React, { PropsWithChildren } from 'react';

interface CardProp {
    title?: React.ReactNode;
    footer?: React.ReactNode;
}

export const Card = ({
    title,
    footer,
    children,
}: PropsWithChildren<CardProp>) => {
    return (
        <div className="card p-0">
            {title && (
                <div className="px-card py-10 border-bottom">
                    <h2 className="card-title font-size-18 m-0">{title}</h2>
                </div>
            )}
            <div className="content">{children}</div>
            {footer && (
                <div className="px-card py-10 bg-light-lm bg-very-dark-dm rounded-bottom">
                    {footer}
                </div>
            )}
        </div>
    );
};
