import { Grid, Typography, LinearProgress } from '@material-ui/core';
import './section-middle.css'

export function SectionMiddle() {
  const skills = [
    { name: 'Typescript / NodeJs', level: 100 },
    { name: 'GraphQL', level: 90 },
    { name: 'Microservices', level: 80 },
    { name: 'React Native', level: 50 },
    { name: 'PostgreSQL', level: 100 },
    { name: 'ReactJs / Angular', level: 80 },
    { name: 'AWS' , level: 60 },
  ]

    return (
        <Grid item className="vertical-section section2-container">
          {/* <Grid container xs={7} direction="row" alignItems="center" justify="flex-sart">
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
          </Grid> */}
        </Grid>
    )
}