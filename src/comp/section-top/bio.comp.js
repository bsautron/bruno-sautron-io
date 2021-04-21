import { Grid, Typography } from '@material-ui/core';

export function AboutMe() {
    return (
        <Grid item sm={4} className="container-section1-item section1-about">
<Typography paragraph={true} color="textPrimary">
Passionate since childhood and officially a developer since my time at <b>school 42</b>, I have so far accumulated a lot of projects and different experiences. My field is web and mobile application development, with an appetite for <b>"Backend"</b> development.
</Typography>

<Typography paragraph={true} color="textPrimary">
I take pleasure in supporting my clients in their ideas and bringing them to life by providing my technical knowledge. I like to collaborate, understand, guide, and finally guide to <b>bring projects to fruition</b>.
</Typography>

<Typography paragraph={true} color="textPrimary">
Beyond delivering a functional application, I try to make a <b>project clear</b>, understandable and re-acceptable by any other developer who will follow and I apply myself to the good <b>progress</b>, good <b>functioning</b>, good <b>deliverability</b>.
</Typography>



        </Grid>
    )
}