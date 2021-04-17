import React, { PropsWithChildren } from 'react';

type EqualsInBetweenSpacing = '' | 'sm' | 'md' | 'lg';

interface RowProps {
    className?: string;
    justifyContentCenter?: boolean;
    equalsInBetweenSpacing?: EqualsInBetweenSpacing;
}

export const Row = ({
    className,
    justifyContentCenter,
    equalsInBetweenSpacing,
    children,
}: PropsWithChildren<RowProps>) => {
    const equalsInBetweenSpacingValue =
        typeof equalsInBetweenSpacing === 'undefined'
            ? ''
            : equalsInBetweenSpacing === 'sm'
            ? 'row-eq-spacing-sm'
            : equalsInBetweenSpacing === 'md'
            ? 'row-eq-spacing-md'
            : equalsInBetweenSpacing === 'lg'
            ? 'row-eq-spacing-lg'
            : 'row-eq-spacing';

    return (
        <div
            className={`row ${
                justifyContentCenter ? 'justify-content-center' : ''
            } ${equalsInBetweenSpacingValue} ${className ?? ''}`}
        >
            {children}
        </div>
    );
};
