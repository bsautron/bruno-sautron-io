import { Grid, Typography } from '@material-ui/core';
import { Experience } from './experience';

export function Job({ title, company, years, tech, explanations }) {
    return <>
        <Grid item lg={4} md={6} sm={6} xs={12}>
            <Experience title={title} company={company} years={years} tech={tech}>
                {
                    explanations.map(explanation => {
                        return <Typography paragraph={true} color="textPrimary"
                        dangerouslySetInnerHTML={{__html: explanation}} />
                    })
                }
            </Experience>
        </Grid>
    </>
}