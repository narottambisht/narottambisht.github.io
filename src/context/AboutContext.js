import React, { useState, createContext } from 'react';

export const AboutContext = createContext();

export const AboutContextProvider = props => {
  const [aboutStore, setAboutStore] = useState({});

  return (
    <AboutContext.Provider value={[aboutStore, setAboutStore]}>
      {props.children}
    </AboutContext.Provider>
  )
}
