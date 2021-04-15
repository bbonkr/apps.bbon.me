import React, { PropsWithChildren } from 'react';

interface ContentProps {
    title?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const Content = ({
    title,
    className,
    style,
    children,
}: PropsWithChildren<ContentProps>) => {
    return (
        <div
            className={`content ${className ?? ''}`}
            style={{ ...(style ?? {}) }}
        >
            {title && <h2 className="content-title">{title}</h2>}
            {children}
        </div>
    );
};
