import React, { useState, createContext } from 'react';

export const WorkExperienceContext = createContext();

export const WorkExperienceContextProvider = props => {
  const [workExperience, setWorkExperience] = useState([]);

  return (
    <WorkExperienceContext.Provider value={[workExperience, setWorkExperience]}>
      {props.children}
    </WorkExperienceContext.Provider>
  )
}
