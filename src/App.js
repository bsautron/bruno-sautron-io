import React, {useState} from 'react'
import { Fab, Grid, Backdrop } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import './App.css';
import { SectionTop } from './comp/section-top/section-one.comp';
import { SectionMiddle } from './comp/section-middle/section-middle';
import { SectionBottom } from './comp/section-bottom/section-bottom';
import {Colorize, FiberManualRecord, FiberManualRecordOutlined } from '@material-ui/icons';
const themes = {


  fortana: {
    background: { default: "#373C36" },
    primary: { main: '#AEC99E' },
    secondary: { main: '#8BA977' },
    text: { primary: '#CBCCCB', secondary:'#636862' }
  },
  plokrar: {
    background: { default: "#1C1C1C" },
    primary: { main: '#AE82FE' },
    secondary: { main: '#EC276E' },
    text: { primary: '#DCDCDC', secondary:'#E3D97A' }
  },
  xorgan: {
    background: { default: "#111111" },
    primary: { main: '#279D29' },
    secondary: { main: '#2F552E' },
    text: { primary: '#C1CBC1', secondary:'#939F93' }
  },
  flybra: {
    background: { default: "#0C161C" },
    primary: { main: '#2EBCF9' },
    secondary: { main: '#3B6B7F' },
    text: { primary: '#DCDCDC', secondary:'#7E94A7' }
  },
  rubo: {
    background: { default: "#ffffff" },
    primary: { main: '#BF646B' },
    secondary: { main: '#DBB8BA' },
    text: { primary: '#3b3a30', secondary:'#AFAFAF' }
  },
  floward: {
    background: { default: "#FAFAFA" },
    primary: { main: '#6AA0C0' },
    secondary: { main: '#A8B5BD' },
    text: { primary: '#3b3a30', secondary:'#A2A2A2' }
  },
  palutis: {
    background: { default: "#333333" },
    primary: { main: '#F28123' },
    secondary: { main: '#AC8362' },
    text: { primary: '#DCDCDC', secondary:'#666666' }
  },
  jukubo: {
    background: { default: "#181818" },
    primary: { main: '#9B905B' },
    secondary: { main: '#666354' },
    text: { primary: '#D3D3D3', secondary:'#A0A0A0' }
  },
  sonoki: {
    background: { default: "#FAFAFA" },
    primary: { main: '#AB9F73' },
    secondary: { main: '#C0BEAC' },
    text: { primary: '#3b3a30', secondary:'#afafaf' }
  },
  default: {
    background: { default: "#FAFAFA" },
    primary: { main: '#3b3a30' },
    secondary: { main: '#3b3a30' },
    text: { primary: '#3b3a30', secondary:'#989898' }
  },
}


  
function App() {
  const [themeName, setTheme] = useState('default')
  const [displayTheme, setDisplayTheme] = useState(false)

  const muiTheme = createMuiTheme({
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
        fontSize: '2.4rem'
      },
      subtitle1: {
        fontSize: '2rem'
      }
    },
    palette: themes[themeName] || themes['default']
    
  });

  return (
    <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    <Grid container direction="column" justify="flex-end" alignContent="flex-end" className="fab-settings">
      <Grid item alignItems="right">

        <Grid container alignItems="center" direction="column">
        {
          displayTheme ? 
          (<Backdrop open={displayTheme} onClick={() => setDisplayTheme(false) }>
            <Grid className="grid-fab-sub-colors" container alignContent="flex-end" direction="column">

            {Object.keys(themes).map((tn, i) => {
                return <Grid item className="fab-sub-colors">
                  <Fab key={i} size="small" color="primary" style={{color: themes[tn].primary.main, backgroundColor: themes[tn].background.default}} aria-label={tn}>
                  {
                    tn === themeName
                    ? <FiberManualRecordOutlined  />
                    : <FiberManualRecord onClick={ (e) => {e.preventDefault(); setTheme(tn);} }/>
                  }
                  </Fab>
                </Grid>
              })}
            </Grid></Backdrop>)  : ''
          }
          <Grid item><Fab size="small" color="primary" aria-label="settings">
            <Colorize onClick={ () => setDisplayTheme(!displayTheme)} />
          </Fab></Grid>
        </Grid>
        
      </Grid>
    </Grid>
    

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
