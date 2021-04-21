import { Grid, Typography } from '@material-ui/core';
import './experience.css';

export function Experience({ title, company, years, children, tech }) {
    return (
        <Grid item sm={3} className="container-section3-item">
            <Grid container className="container-section3-job" direction="column" alignItems="flex-start">
              <Grid item className="item-section3 item-section3-titles">
                <Typography className="item-section3-titles-title" align="right" variant="h3" color="primary">{title}</Typography>
                <Typography className="item-section3-titles-years"align="right" variant="subtitle2" color="textSecondary">{company} @ {years}</Typography>
              </Grid>
              <Grid item className="item-section3">
            </Grid>
              <Typography color="textPrimary">
                 {children}
              </Typography>
              <Grid item className="item-section3">
                <ul>
                  {
                      tech.map((t, i) => {
                          return <li key={i}>{t.join(' - ')}</li>
                      })
                  }
                </ul>
              </Grid>
            </Grid>
          </Grid>
    )
}