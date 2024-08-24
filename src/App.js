import React, { useState } from 'react'
import { Grid, Typography, Backdrop, LinearProgress, Chip } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import './App.css';
import themeJson from './themes.json'
import skills from './skills.json'
import jobs from './jobs.json'
import { Names } from './comp/section-top/names.comp'
import { Contacts } from './comp/section-top/contacts.comp'
import { AboutMe } from './comp/section-top/about-me.comp'
import { Job } from './comp/section-bottom/job'

import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Colorize, FiberManualRecord, Star, Palette } from '@material-ui/icons';

function App() {
  const [themeName, setTheme] = useState('syldrak')
  const [displayTheme, setDisplayTheme] = useState(false)

  const muiTheme = createTheme({
    typography: themeJson.sizes,
    palette: themeJson.colors[themeName] || themeJson.colors['syldrak']

  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <Backdrop open={displayTheme} onClick={() => setDisplayTheme(false)} />
      <SpeedDial
        className="colorize"
        direction="up"
        ariaLabel="Teeme Picker"
        icon={<Colorize />}
        onClose={() => setDisplayTheme(false)}
        onOpen={() => setDisplayTheme(true)}
        open={displayTheme}
      >
        {Object.keys(themeJson.colors).map((tn, i) => {
          return <SpeedDialAction
            FabProps={{ style: { color: themeJson.colors[tn].primary.main, backgroundColor: themeJson.colors[tn].background.default } }}
            key={i}
            icon={tn === themeName ? <Palette /> : <FiberManualRecord onClick={(e) => { e.stopPropagation(); setTheme(tn); }} />}
            tooltipTitle={tn}
            onClick={() => setDisplayTheme(false)}
          />
        })}
      </SpeedDial>

      <div className="container">
        <Grid container className="container-grid" direction="column" justifyContent="space-between" alignItems="center">
          <Grid item className="vertical-section">
            <Grid container className="container-section1" spacing={3} direction="row" justifyContent="space-between">
              <Grid item lg={8} md={12} sm={12} xs={12} container >
                <Grid item className="section-item item-names" sm={6} xs={12}> <Names /> </Grid>
                <Grid item className="section-item item-contacts" sm={6} xs={12} > <Contacts /> </Grid>
                <Grid item className="section-item item-skills" xs={12}>
                  <Typography variant="h3" color="primary">Skills</Typography>

                  <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start"  >
                    {skills.map((s) => {
                      return (
                        <Grid item sm={3} xs={12} key={s.name} className="skill-item">
                            <Typography color="textPrimary">{s.name}</Typography>
                            <LinearProgress className="skill-level" variant="determinate" value={s.level} />
                            <Grid container style={{ marginTop: '4px'}}>
                              {s.tools.map((t) => <Grid style={{ marginRight: '4px', marginBottom: '4px'}}item><Chip key={t.name} color={t.favorite ? "primary" : 'secondary'} icon={t.favorite && <Star/>} label={t.name} variant='outlined' size='small'/></Grid>)}
                            </Grid>
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
                  {
                    jobs.map(job => {
                      return <Job
                        title={job.title}
                        company={job.company}
                        years={job.years}
                        tech={job.tech}
                        explanations={job.explanations}
                      />
                    })
                  }
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
