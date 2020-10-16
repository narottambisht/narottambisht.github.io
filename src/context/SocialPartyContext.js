import React, { useState, createContext } from 'react';

export const SocialPartyContext = createContext(null);

export const SocialPartyContextProvider = props => {
  const [socialParty, setSocialParty] = useState([]);

  return (
    <SocialPartyContext.Provider value={[socialParty, setSocialParty]}>
      {props.children}
    </SocialPartyContext.Provider>
  )
}
