import React                             from "react";
import ReactDOM                          from "react-dom";
import { HashRouter }                    from "react-router-dom";
import "./index.css"
import App                               from "./App";
import { RootContextProvider }           from "./context/RootContext";
import { SkillsContextProvider }         from "./context/SkillsContext";
import { PortfolioInfoContextProvider }  from "./context/PortfolioInfoContext";
import { WorkExperienceContextProvider } from "./context/WorkExperienceContext";
import { AboutContextProvider }          from "./context/AboutContext";
import { SocialPartyContextProvider }    from "./context/SocialPartyContext";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <RootContextProvider>
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
      </RootContextProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
