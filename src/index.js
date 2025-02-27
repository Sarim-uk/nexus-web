import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { lazy, Suspense } from 'react';
import reportWebVitals from './reportWebVitals';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AnimatePresence } from 'framer-motion';

const container = document.getElementById('root');
const root = createRoot(container);

const App = lazy(() => import('./App'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AnimatePresence mode='wait'>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </AnimatePresence>
    </ErrorBoundary>
  </React.StrictMode>
);

// Optional: Add performance measuring
reportWebVitals(console.log);
