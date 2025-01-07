import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import whyDidYouRender from '@welldone-software/why-did-you-render';
import React, { StrictMode } from 'react';
if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
