import React, { useContext }                                  from 'react';
import red                                                    from '@material-ui/core/colors/red';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Particles                                              from 'react-particles-js';
import Header                                                 from './components/Header';
import { particleJsConfig }                                   from './utils/config-util';
import { RootContext }                                        from './context';

function App() {
  const [rootStore] = useContext(RootContext);

  const theme = responsiveFontSizes(createMuiTheme({
    overrides : {
      MuiCard: {
        root: {
          borderRadius: 20
        }
      }
    },
    typography: {
      fontFamily: 'Montserrat'
    },
    palette   : {
      type      : rootStore.theme,
      primary   : red,
      background: {
        default: rootStore.theme === 'light' ? '#DAE3E7' : '#303030'
      }
    }
  }));

  return (
    <ThemeProvider theme={theme}>
      <Particles
        style={{ position: 'fixed', zIndex: '-1' }}
        params={particleJsConfig}/>
      <Header/>
    </ThemeProvider>
  );
}

export default App;
