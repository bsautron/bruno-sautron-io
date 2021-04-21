import { Grid, Typography } from '@material-ui/core';
import './names.css'
export function Names() {

    return (
        <Grid item sm={4} className="container-section1-item section1-names">
          <div className="section1-names-fullname">
            <Typography className="section1-names-firstname" variant="h1" color="secondary">Bruno</Typography>
            <Typography className="section1-names-lastname" variant="h1" color="primary"><b>Sautron</b></Typography>
          </div>
          <Typography className="section1-names-title" variant="subtitle1" color="textSecondary">Web Developer via 42</Typography>
        </Grid>
    )
}