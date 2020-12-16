import React          from 'react';
import ReactDOM       from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './index.css'
import App            from './App';
import {
  RootContextProvider,
  SkillsContextProvider,
  PortfolioInfoContextProvider,
  WorkExperienceContextProvider,
  AboutContextProvider,
  SocialPartyContextProvider,
  TechStackContextProvider
}                     from './context';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <RootContextProvider>
        <TechStackContextProvider>
          <PortfolioInfoContextProvider>
            <SkillsContextProvider>
              <WorkExperienceContextProvider>
                <AboutContextProvider>
                  <SocialPartyContextProvider>
                    <App/>
                  </SocialPartyContextProvider>
                </AboutContextProvider>
              </WorkExperienceContextProvider>
            </SkillsContextProvider>
          </PortfolioInfoContextProvider>
        </TechStackContextProvider>
      </RootContextProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);