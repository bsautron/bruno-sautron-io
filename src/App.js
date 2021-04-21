import React, {useState} from 'react'
import { Hidden , Fab, Grid, Backdrop, Typography, LinearProgress } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import './App.css';
import {Colorize, FiberManualRecord, Palette } from '@material-ui/icons';
import themeJson from './themes.json'
import skills from './skills.json'
import {Names } from './comp/section-top/names.comp'
import {Contacts } from './comp/section-top/contacts.comp'
import {AboutMe } from './comp/section-top/about-me.comp'
import { Experience } from './comp/section-bottom/experience';

function App() {
  const [themeName, setTheme] = useState('default')
  const [displayTheme, setDisplayTheme] = useState(false)

  const muiTheme = createMuiTheme({
    typography: themeJson.sizes,
    palette: themeJson.colors[themeName] || themeJson.colors['default']
    
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      
      {/* <Grid container direction="column" justify="flex-end" alignContent="flex-end" className="fab-settings">
        <Grid item alignItems="right">

          <Grid container alignItems="center" direction="column">
          {
            displayTheme ? 
            (<Backdrop open={displayTheme} onClick={() => setDisplayTheme(false) }>
              <Grid className="grid-fab-sub-colors" container alignContent="flex-end" direction="column">

              {Object.keys(themeJson.colors).map((tn, i) => {
                  return <Grid item className="fab-sub-colors">
                    <Fab key={i} size="small" color="primary" style={{color: themeJson.colors[tn].primary.main, backgroundColor: themeJson.colors[tn].background.default}} aria-label={tn}>
                    {
                      tn === themeName
                      ? <Palette  />
                      : <FiberManualRecord onClick={ (e) => {e.preventDefault(); setTheme(tn);} }/>
                    }
                    </Fab>
                  </Grid>
                })}
              </Grid></Backdrop>)  : ''
            }
            <Grid item className="grid-fab-colors">
              <Fab size="small" color="primary" aria-label="settings">
                <Colorize onClick={ () => setDisplayTheme(!displayTheme)} />
              </Fab>
            </Grid>
          </Grid>
          
        </Grid>
      </Grid> */}
      {/* import { SpeedDial } from '@material-ui/lab'; */}

      

      <div className="container">
        <Grid className="container-grid" direction="column" justify="space-between" alignItems="center">
          
          <Grid item className="vertical-section">
            <Grid container className="container-section1" spacing={3} direction="row" justify="space-between">
              <Grid item lg={8} md={12} sm={12} xs={12} container >
                <Grid item className="section-item item-names" sm={6} xs={12}> <Names /> </Grid>
                <Grid item className="section-item item-contacts" sm={6} xs={12} > <Contacts /> </Grid>
                <Grid item className="section-item item-skills" xs={12}>
                  <Typography variant="h3" color="primary">Skills</Typography>

                  <Grid container direction="row" alignItems="center" justify="flex-sart">
                    { skills.map((s, i) => {
                      return (
                        <Grid item key={i} className="skill">
                          <div >
                            <Typography color="textPrimary">{s.name}</Typography>
                            <LinearProgress variant="determinate" value={s.level} />
                          </div>
                        </Grid>
                      )
                      })
                    }
                  </Grid>
                </Grid>

              </Grid>
              <Grid item className="section-item item-about" lg={4} md={12} sm={12} xs={12} > <AboutMe /> </Grid>
              <Grid item className="section-item item-experiences" xs={12}>
                <Grid container direction="row" justify="space-between">
                  <Grid item lg={3} md={6} sm={6} xs={12}>
                    <Experience title="Fullstack" company="Neo9" years="2016 - 2017" tech={[
                      ["angularjs", "nodejs", "mongodb"],
                      ["rest api", "microservices"],
                      ["ngnix", "elasticsearch", "jenkins" ],
                  ]}>
                    <Typography paragraph={true} color="textPrimary">
                      Developement of a e-commerce platform Pixmania.com
                      </Typography>
                      <Typography paragraph={true} color="textPrimary">
                      Developed with <b>AngularJS</b> and NodeJS for microservices
                      </Typography>
                      <Typography paragraph={true} color="textPrimary">
                      Deployed in <b>14 diffrents countries</b>
                      </Typography>
                  </Experience>
                  </Grid>
                  <Grid item lg={3} md={6} sm={6} xs={12}>
                    <Experience title="Fullstack" company="LikeWeb Agency" years="2017" tech={[
                      ["typescript", "nodejs", "rest api"],
                      ["ionic", "angularjs", "mongodb"],
                  ]}>
                    <Typography paragraph={true} color="textPrimary">
                      Developement of a <b>Ionic app</b> for doctors which connects doctors and substitute doctors.
                    </Typography>
                    <Typography paragraph={true} color="textPrimary">
                      Developement of a NodeJS <b>api rest</b> backend for no-sql data
                    </Typography>
                  </Experience>
                  </Grid>
                  <Grid item lg={3} md={6} sm={6} xs={12}>
                    <Experience title="Lead backend" company="Pickme" years="2020" tech={[
                      ["typescript", "nodejs", "graphql", "postgresql"],
                      ["rest api", "react native", "typeorm"],
                      ["aws", "SQS/SNS", "docker", "nestjs"]
                  ]}>
                    <Typography paragraph={true} color="textPrimary">
                      Developement of a <b>React Native app</b> for to manage a neighborhood relay point community
                    </Typography>
                    <Typography paragraph={true} color="textPrimary">
                      Creation of <b>reactive backend</b> thanks AWS SQS/SNS, cosumed by the app, the retailer and carrier
                    </Typography>
                  </Experience>
                  </Grid>
                  <Grid item lg={3} md={6} sm={6} xs={12}>
                    <Experience title="Backend" company="Wemaintain" years="2018 - 2020" tech={[
                      ["typescript", "nodejs", "graphql", "postgresql"],
                      ["rest api", "react native", "typeorm", "code first"],
                      ["aws", "SQS/SNS", "docker", "gPRC", "nestjs"]
                  ]}>
                    <Typography paragraph={true} color="textPrimary">
                      Developement of a platform to manage the lift mecanics from all maintenances and repairs tasks
                    </Typography>
                      <Typography paragraph={true} color="textPrimary">
                      Contribution of <b>powerful microservice</b> backend thanks recents librairies such as <b>GraphQL, gRPC,</b> ...
                    </Typography>
                  </Experience>
                  </Grid>
                </Grid>
              </Grid>
            </Grid> 
          </Grid> 
        </Grid>
      </div>

    </ThemeProvider>
  );
}

export default App;
