import React, { PropsWithChildren } from 'react';

interface FeaturedImage {
    imageUri: string;
    imageAlt?: string;
}

interface CardProp {
    title?: React.ReactNode;
    featuredImage?: FeaturedImage;
    footer?: React.ReactNode;
    useTitleBorder?: boolean;
}

export const Card = ({
    title,
    featuredImage,
    footer,
    useTitleBorder,
    children,
}: PropsWithChildren<CardProp>) => {
    return (
        <div className="card p-0">
            {featuredImage && (
                <img
                    src={featuredImage.imageUri}
                    alt={featuredImage.imageAlt ?? ''}
                    className="img-fluid rounded-top"
                />
            )}
            {title && (
                <div
                    className={`px-card py-10 ${
                        useTitleBorder ? 'border-bottom' : ''
                    }`}
                >
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
