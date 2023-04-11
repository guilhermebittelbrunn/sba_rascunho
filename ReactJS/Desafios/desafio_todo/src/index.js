import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Input from './Input';
import List from './list';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Application() {
    return (
        <>
            <Input />
            <List />
        </>
    );
}

root.render(<Application />);
