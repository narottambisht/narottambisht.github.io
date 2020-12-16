import React, { useState, createContext } from 'react';

export const TechStackContext = createContext([]);

export const TechStackContextProvider = props => {
  const [techStack, setTechStack] = useState([]);

  return (
    <TechStackContext.Provider value={[techStack, setTechStack]}>
      {props.children}
    </TechStackContext.Provider>
  )
}
