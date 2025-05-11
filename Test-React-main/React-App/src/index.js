import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { DataProvider } from './components/DataContext.js';

const container = document.getElementById('root');

const root = createRoot(container);
root.render(
    <DataProvider>
        <App />
    </DataProvider>
    
);
