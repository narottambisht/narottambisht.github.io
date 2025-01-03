import React, { createContext, useEffect, useState } from "react";

export const RootContext = createContext();

export const RootContextProvider = props => {
  const [rootStore, setRootStore] = useState({ drawerOpen: false, theme: "dark" });

  useEffect(() => {
    function fetchIpInfo () {
      fetch("https://ipapi.co/json/").then(response => {
        if (response.ok) {
          let ipInfoResponseJson = response.json();
          setRootStore({ ...rootStore, ipInfo: ipInfoResponseJson });
        }
      }).catch(error => {
        console.log(error);
        setRootStore({ ...rootStore, ipInfo: {} });
      })
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
