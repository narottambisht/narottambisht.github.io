import React, { useState, createContext } from 'react';

export const SkillsContext = createContext();

export const SkillsContextProvider = props => {
  const [skills, setSkills] = useState([]);

  return (
    <SkillsContext.Provider value={[skills, setSkills]}>
      {props.children}
    </SkillsContext.Provider>
  )
}
