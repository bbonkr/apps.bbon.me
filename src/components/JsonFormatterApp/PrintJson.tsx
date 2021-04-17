import React, { useEffect } from 'react';
import Prism from 'prismjs';

import 'prismjs/themes/prism-tomorrow.css';

interface PrintJsonProps {
    json?: string;
}

export const PrintJson = ({ json }: PrintJsonProps) => {
    useEffect(() => {
        if (json) {
            Prism.highlightAll(true);
        }
    }, [json]);

    return (
        <section className="print-json">
            <pre className="language-json text-smoothing-antialiased-lm">
                {json}
            </pre>
        </section>
    );
};
