import React, { useState, createContext } from 'react';

export const PortfolioInfoContext = createContext();

export const PortfolioInfoContextProvider = props => {
  const [portfolioInfoStore, setPortfolioInfoStore] = useState({ skills: [] });

  return (
    <PortfolioInfoContext.Provider value={[portfolioInfoStore, setPortfolioInfoStore]}>
      {props.children}
    </PortfolioInfoContext.Provider>
  )
}