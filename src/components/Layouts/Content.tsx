import React, { PropsWithChildren } from 'react';

interface ContentProps {
    title?: React.ReactNode;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
}

export const Content = ({
    title,
    id,
    className,
    style,
    children,
}: PropsWithChildren<ContentProps>) => {
    return (
        <div
            className={`content ${className ?? ''}`}
            style={{ ...(style ?? {}) }}
            id={id}
        >
            {title && <h2 className="content-title">{title}</h2>}
            {children}
        </div>
    );
};
