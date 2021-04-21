import { Grid } from '@material-ui/core';
import { AboutMe } from './bio.comp';
import { Contacts } from './contacts.comp';
import { Names } from './names.comp';

export function SectionTop() {
  return (
    <Grid item className="vertical-section">
      <Grid container className="container-section1" direction="row" justify="space-between">
        <Grid item lg={4} md={6} sm={6} xs={12} className="container-section1-item section1-names"> <Names /> </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12} className="container-section1-item section1-contacts"> <Contacts /> </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12} className="container-section1-item section1-about"> <AboutMe /> </Grid>
      </Grid>
    </Grid>
  )
}