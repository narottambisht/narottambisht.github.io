import React, { createContext, useEffect, useState } from "react";

export const RootContext = createContext();

export const RootContextProvider = props => {
  const [rootStore, setRootStore] = useState({ drawerOpen: false, theme: "dark" });

  useEffect(() => {
    async function fetchIpInfo () {
      const ipInfo = await fetch("https://ipapi.co/json/");
      let ipInfoResponseJson = await ipInfo.json();
      setRootStore({ ...rootStore, ipInfo: ipInfoResponseJson });
    }

    fetchIpInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RootContext.Provider value={[rootStore, setRootStore]}>
      {props.children}
    </RootContext.Provider>
  )
}
