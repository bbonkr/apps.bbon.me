import React from 'react';
import halfmoon from 'halfmoon';
import { FaMoon } from 'react-icons/fa';

export const ThemeButton = () => {
    const handleToggleDarkmode = () => {
        halfmoon.toggleDarkMode();
        halfmoon.deactivateAllDropdownToggles();
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
