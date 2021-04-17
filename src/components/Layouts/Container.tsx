import React, { PropsWithChildren } from 'react';

interface ContainerProps {}

export const Container = ({ children }: PropsWithChildren<ContainerProps>) => {
    return <div className="container-fluid">{children}</div>;
};
