import React from 'react';

import './style.css';

export const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-box">
                <div className="loading"></div>
                <div id="loading-text">Loading</div>
            </div>
        </div>
    );
};
