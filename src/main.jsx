import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AuthContextProvider from './context/AuthContext.jsx';
import { ChatContextProvider } from './context/ChatContext.jsx';
import('preline');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <ChatContextProvider>
                    <App />
                </ChatContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
