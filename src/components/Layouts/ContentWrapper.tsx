import React, { useEffect, useRef, useState, PropsWithChildren } from 'react';
import { Position } from '../../models';

interface ContentWrapperProps {
    scrollPosition: Position;
    onScroll?: (left: number, top: number) => void;
}

export const ContentWrapper = ({
    children,
    scrollPosition,
    onScroll,
}: PropsWithChildren<ContentWrapperProps>) => {
    const contentWrapperRef = useRef<HTMLDivElement>(null);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (contentWrapperRef.current) {
                if (onScroll) {
                    onScroll(
                        contentWrapperRef.current.scrollLeft,
                        contentWrapperRef.current.scrollTop,
                    );
                }

                if (contentWrapperRef.current.scrollTop > 30) {
                    setShowScrollToTop((prevState) => true);
                } else {
                    setShowScrollToTop((prevState) => false);
                }
            }
        };

        if (contentWrapperRef.current) {
            contentWrapperRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (contentWrapperRef.current) {
                contentWrapperRef.current.removeEventListener(
                    'scroll',
                    handleScroll,
                );
            }
        };
    }, []);

    useEffect(() => {
        if (scrollPosition.top + scrollPosition.left === 0) {
            if (contentWrapperRef.current) {
                contentWrapperRef.current.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: 'smooth',
                });
            }
        }
    }, [scrollPosition]);

    return (
        <div className="content-wrapper" ref={contentWrapperRef}>
            {children}
        </div>
    );
};
