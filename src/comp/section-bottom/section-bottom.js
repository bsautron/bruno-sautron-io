          
import { Grid, Typography } from '@material-ui/core';
import { Experience } from './experience';

export function SectionBottom() {
    return (
      <Grid item className="vertical-section">
        <Grid container className="container-section3" direction="row" justify="space-between">
          <Experience title="Fullstack" company="Neo9" years="2016 - 2017" tech={[
            ["angularjs", "nodejs", "mongodb"],
            ["rest api", "microservices"],
            ["ngnix", "elasticsearch", "jenkins" ],
          ]}>
            <Typography paragraph={true} color="textPrimary">
              Developement of a e-commerce platform Pixmania.com
              </Typography>
              <Typography paragraph={true} color="textPrimary">
              Developed with <b>AngularJS</b> and NodeJS for microservices
              </Typography>
              <Typography paragraph={true} color="textPrimary">
              Deployed in <b>14 diffrents countries</b>
              </Typography>
          </Experience>

          <Experience title="Fullstack" company="LikeWeb Agency" years="2017" tech={[
            ["typescript", "nodejs", "rest api"],
            ["ionic", "angularjs", "mongodb"],
          ]}>
            <Typography paragraph={true} color="textPrimary">
              Developement of a <b>Ionic app</b> for doctors which connects doctors and substitute doctors.
            </Typography>
            <Typography paragraph={true} color="textPrimary">
              Developement of a NodeJS <b>api rest</b> backend for no-sql data
            </Typography>
          </Experience>
          
          <Experience title="Lead backend" company="Pickme" years="2020" tech={[
            ["typescript", "nodejs", "graphql", "postgresql"],
            ["rest api", "react native", "typeorm"],
            ["aws", "SQS/SNS", "docker", "nestjs"]
          ]}>
            <Typography paragraph={true} color="textPrimary">
              Developement of a <b>React Native app</b> for to manage a neighborhood relay point community
            </Typography>
            <Typography paragraph={true} color="textPrimary">
              Creation of <b>reactive backend</b> thanks AWS SQS/SNS, cosumed by the app, the retailer and carrier
            </Typography>
          </Experience>

          <Experience title="Backend" company="Wemaintain" years="2018 - 2020" tech={[
            ["typescript", "nodejs", "graphql", "postgresql"],
            ["rest api", "react native", "typeorm", "code first"],
            ["aws", "SQS/SNS", "docker", "gPRC", "nestjs"]
          ]}>
            <Typography paragraph={true} color="textPrimary">
              Developement of a platform to manage the lift mecanics from all maintenances and repairs tasks
            </Typography>
              <Typography paragraph={true} color="textPrimary">
              Contribution of <b>powerful microservice</b> backend thanks recents librairies such as <b>GraphQL, gRPC,</b> ...
            </Typography>
          </Experience>
        </Grid>
      </Grid>

    )
}