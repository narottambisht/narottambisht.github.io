import React, { createContext, useState } from "react";

export const RemoteConfigContext = createContext({});

export const RemoteConfigContextProvider = props => {
  const [remoteConfigStore, setRemoteConfigStore] = useState({});

  return (
    <RemoteConfigContext.Provider value={[remoteConfigStore, setRemoteConfigStore]}>
      {props.children}
    </RemoteConfigContext.Provider>
  )
}
