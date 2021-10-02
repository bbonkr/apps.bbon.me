import { ComponentType } from 'react';

export class CoomponentHelper {
    public getDisplayName<TProps = Record<string, unknown>>(
        Component: ComponentType<TProps>,
    ): string | undefined {
        if (typeof Component === 'string') {
            return Component;
        }

        if (!Component) {
            return undefined;
        }

        return Component.displayName || Component.name || 'Component';
    }
}
