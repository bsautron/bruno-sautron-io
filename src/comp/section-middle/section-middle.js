import { Grid, Typography, LinearProgress } from '@material-ui/core';

export function SectionMiddle() {
    return (
        <Grid item className="vertical-section">
          <div className="skill">
            <Typography color="textPrimary">Typescript / NodeJs</Typography>
            <LinearProgress variant="determinate" value={100} />
          </div>
          <div className="skill">
            <Typography color="textPrimary">PostgreSQL</Typography>
            <LinearProgress variant="determinate" value={100} />
          </div>
          <div className="skill">
            <Typography color="textPrimary">GraphQL</Typography>
            <LinearProgress variant="determinate" value={90} />
          </div>
          <div className="skill">
            <Typography color="textPrimary">ReactJs / Angular</Typography>
            <LinearProgress variant="determinate" value={80} />
          </div>
          <div className="skill">
            <Typography color="textPrimary">Microservices</Typography>
            <LinearProgress variant="determinate" value={80} />
          </div>
          <div className="skill">
            <Typography color="textPrimary">React Native</Typography>
            <LinearProgress variant="determinate" value={50} />
          </div>
        </Grid>
    )
}