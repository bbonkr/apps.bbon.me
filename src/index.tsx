import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

import 'halfmoon/css/halfmoon.min.css';

const element = document.querySelector('#app');

if (element) {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        element,
    );
}
