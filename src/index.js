import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css'
import App from './App';
import { RootContextProvider } from './context/RootContext';
import { SkillsContextProvider } from './context/SkillsContext';
import { PortfolioInfoContextProvider } from './context/PortfolioInfoContext';
import { WorkExperienceContextProvider } from './context/WorkExperienceContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RootContextProvider>
        <PortfolioInfoContextProvider>
          <SkillsContextProvider>
            <WorkExperienceContextProvider>
              <App />
            </WorkExperienceContextProvider>
          </SkillsContextProvider>
        </PortfolioInfoContextProvider>
      </RootContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);