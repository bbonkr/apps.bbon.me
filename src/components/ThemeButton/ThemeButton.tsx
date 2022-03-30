import React from 'react';
import halfmoon from 'halfmoon';
import { FaMoon } from 'react-icons/fa';

export const ThemeButton = () => {
    const handleToggleDarkmode = () => {
        halfmoon.toggleDarkMode();
        halfmoon.deactivateAllDropdownToggles();

        const theme = halfmoon.readCookie('halfmoon_preferredMode');

        if (typeof ga === 'function') {
            ga('send', 'event', 'set_theme', {
                theme: theme ?? 'light-mode',
                debug_mode: process.env.ENV !== 'production',
            });
        }
    };

    return (
        <button
            className="btn"
            onClick={handleToggleDarkmode}
            aria-label="Toggle site theme"
        >
            <FaMoon />
        </button>
    );
};
