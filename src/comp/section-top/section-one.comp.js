import { Grid } from '@material-ui/core';
import { AboutMe } from './bio.comp';
import { Contacts } from './contacts.comp';
import { Names } from './names.comp';

export function SectionTop() {
  return (
    <Grid item className="vertical-section">
      <Grid container className="container-section1" direction="row" justify="space-between">
        <Names />
        <Contacts />
        <AboutMe />
      </Grid>
    </Grid>
  )
}