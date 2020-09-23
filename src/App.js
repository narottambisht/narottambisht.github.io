import React, { useContext } from 'react';
import red from '@material-ui/core/colors/red';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import Header from './components/Header';
import { RootContext } from './context/RootContext';

function App() {
  const [rootStore] = useContext(RootContext);

  const theme = responsiveFontSizes(createMuiTheme({
    typography: {
      fontFamily: 'Montserrat'
    },
    palette: {
      type: rootStore.theme,
      primary: red,
      background: {
        default: rootStore.theme === 'light' ? '#DAE3E7' : '#303030'
      }
    }
  }));

  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
