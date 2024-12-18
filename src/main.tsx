import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');
createRoot(container as Element).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
