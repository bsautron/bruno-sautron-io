import { Grid, Typography } from '@material-ui/core';
import { Mail, Phone, LocationOn } from '@material-ui/icons';

export function Contacts() {
    return (
        <Grid item sm={4} className="container-section1-item section1-contacts">
          <Grid container className="container-section1-contacts" direction="column" justify="space-around">
            <Grid item>
              <Typography className="section1-contacts-item" variant="h4" color="textPrimary">
                <Mail fontSize="large"/> bruno@sautron.io
              </Typography>
          </Grid>
          <Grid item>
            <Typography className="section1-contacts-item" variant="h4" color="textPrimary">
              <Phone fontSize="large"/> +33 7 86 65 45 20
            </Typography>
          </Grid>
            <Grid item>
              <Typography className="section1-contacts-item" variant="h4" color="textPrimary">
                <LocationOn fontSize="large"/>Full Remote
              </Typography>
            </Grid>
          </Grid>
        </Grid>
    )
}