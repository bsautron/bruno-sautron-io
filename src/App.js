import { Grid } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import './App.css';
import { SectionTop } from './comp/section-top/section-one.comp';
import { SectionMiddle } from './comp/section-middle/section-middle';
import { SectionBottom } from './comp/section-bottom/section-bottom';

const themes = {
  default: {
    background: {
      default: "#FDFEFE"
    },
    primary: {
      main: '#3b3a30',
    },
    secondary: {
      main: '#3b3a30',
    },
    text: {
      primary: '#3b3a30',
      secondary:'#989898'
    }
  }
}

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Segoe UI',
    htmlFontSize: 14,
    h1: {
      fontFamily: 'Bebas Neue, cursive',
      fontSize: '7rem'
    },
    h2: {
      fontFamily: 'Bebas Neue, cursive'
    },
    h3: {
      fontFamily: 'Bebas Neue, cursive'
    },
    h4: {
      fontSize: '3rem'
    },
    subtitle1: {
      fontSize: '2rem'
    }
  },
  palette: themes['default']
  
});
  
function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />

    <div className="container">
      <Grid container className="container-grid" direction="column" justify="space-between" alignItems="center">
        <SectionTop />
        <SectionMiddle />
        <SectionBottom />
      </Grid>
    </div>
    </ThemeProvider>
  );
}

export default App;
