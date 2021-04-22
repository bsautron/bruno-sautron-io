import { Grid, Typography, Link } from '@material-ui/core';
import { MailOutline, WhatsApp, Public, Home } from '@material-ui/icons';
import './contacts.css'
export function Contacts() {
    return (
        
          <Grid container className="container-section1-contacts" direction="column" spacing={2} justify="space-around">
            <Grid item>
              <Link component="a" color="textPrimary" href="mailto:bruno@sautron.io">
                <Grid container direction="row">
                  <Grid item>
                    <MailOutline color="primary" className="icon-contact"/>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4">bruno@sautron.io</Typography>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
            <Grid item>
              <Link component="a" color="textPrimary" href="tel:+33786654520">
                <Grid container direction="row">
                  <Grid item>
                    <WhatsApp color="primary" className="icon-contact"/>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" color="textPrimary">+33 7 86 65 45 20</Typography>
                  </Grid>
                </Grid>
                
              </Link>
            </Grid>
            <Grid item>
              <Link component="a" color="textPrimary" target="_blank" href="https://www.google.fr/maps/space/io/@-13.1874945,-22.9320692,19286313m/data=!3m1!1e3">
                <Grid container direction="row">
                  <Grid item>
                    <Public color="primary" className="icon-contact"/>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" color="textPrimary">Full Remote</Typography>
                  </Grid>
                </Grid>
              </Link>
            </Grid>

            <Grid item>
                <Grid container direction="row" alignItems="center">
                  <Grid item><Home color="primary" className="icon-contact"/></Grid>
                  <Grid item><Link className="aditional-contact-link" color="textPrimary" component="a" target="_blank" href="https://www.linkedin.com/in/bsautron/">Linkedin</Link></Grid>
                  <Grid item><Link className="aditional-contact-link" color="textPrimary" component="a" target="_blank" href="https://www.malt.fr/profile/brunosautron/">Malt</Link></Grid>
                  <Grid item><Link className="aditional-contact-link" color="textPrimary" component="a" target="_blank" href="https://www.instagram.com/by.sautron/">Instagram</Link></Grid>
                </Grid>
            </Grid>
          </Grid>
    )
}