import React, { useEffect, useState } from 'react';
import { Config } from '../models';
import { config as initailConfig } from '../config';

export const useConfig = () => {
    const [config, setConfig] = useState<Config>({
        ...initailConfig,
    });

    useEffect(() => {
        setConfig((prevState) => {
            if ('app' in window && window.app) {
                return {
                    ...prevState,
                    title: window.app.title ?? '',
                    version: window.app.version,
                    description: window.app.description,
                };
            }

            return { ...prevState };
        });
    }, []);

    return {
        ...config,
    };
};

type UseConfigHook = typeof useConfig;
export type UseConfig = ReturnType<UseConfigHook>;
