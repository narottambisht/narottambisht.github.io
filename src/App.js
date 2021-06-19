import React                                                  from "react";
import red                                                    from "@material-ui/core/colors/red";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import Particles                                              from "react-particles-js";
import Header                                                 from "./components/Header";
import { particleJsConfig }                                   from "./utils/config-util";
import { RootContext }                                        from "./context/RootContext";
import { RemoteConfigContext }                                from "./context/RemoteConfigContext";
import { fetchAndActivateRemoteConfig }                       from "./utils/FirebaseConfig";

function App () {
  const [rootStore]                               = React.useContext(RootContext),
        [remoteConfigStore, setRemoteConfigStore] = React.useContext(RemoteConfigContext),
        [themeConfig, setThemeConfig]             = React.useState({});

  React.useEffect(() => {
    fetchAndActivateRemoteConfig(setRemoteConfigStore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (remoteConfigStore.theme)
      setThemeConfig(remoteConfigStore.theme);
  }, [remoteConfigStore]);

  const theme = responsiveFontSizes(createMuiTheme({
    overrides : {
      MuiCard: {
        root: {
          borderRadius: 20,
        },
      },
    },
    typography: {
      fontFamily: "CircularStd-Book",
    },
    palette   : {
      type      : rootStore.theme,
      primary   : red,
      background: {
        default: rootStore.theme === "light" ? themeConfig.light : themeConfig.dark,
      },
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <Particles
        style={{ position: "fixed", zIndex: "-1" }}
        params={particleJsConfig}
      />
      <Header/>
    </ThemeProvider>
  );
}

export default App;
