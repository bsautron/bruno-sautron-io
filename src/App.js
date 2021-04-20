import { Container, Grid, Typography } from '@material-ui/core';
import { Mail, Phone, LocationOn } from '@material-ui/icons';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import './App.css';

const themes = {
  default: {
    background: {
      default: "#FDFEFE"
    },
    primary: {
      main: '#3b3a30',
    },
    secondary: {
      main: '#3b3a30',
    },
    text: {
      primary: '#3b3a30',
      secondary:'#CCD1D1'
    }
  }
}

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Segoe UI',
    h1: {
      fontFamily: 'Bebas Neue, cursive',
      fontSize: '7rem'
    },
    h2: {
      fontFamily: 'Bebas Neue, cursive'
    },
    h3: {
      fontFamily: 'Bebas Neue, cursive'
    },
    h4: {
      fontSize: '3rem'
    },
    subtitle1: {
      fontSize: '2rem'
    }
  },
  palette: themes['default']
  
});
  
function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />

    <div className="container">
      <Grid container className="container-grid" direction="column" justify="space-between" alignItems="center">
        <Grid item className="vertical-section">
          <Grid container className="container-section1" direction="row" justify="space-between" alignItems="center">
            <Grid item sm={4} className="container-section1-item section1-names">
              <div className="section1-names-fullname">
                <Typography className="section1-names-firstname" variant="h1" color="secondary">Bruno</Typography>
                <Typography className="section1-names-lastname" variant="h1" color="primary"><b>Sautron</b></Typography>
              </div>
              <Typography className="section1-names-title" variant="subtitle1" color="textSecondary">42 - Web Developer</Typography>
            </Grid>
            <Grid item sm={4} className="container-section1-item section1-contacts">
              <Grid container className="container-section1-contacts" direction="column" justify="space-around">
                <Grid item>
                  <Typography className="section1-contacts-item" variant="h4" color="textPrimary">
                    <Mail /> bruno@sautron.io
                  </Typography>
               </Grid>
               <Grid item>
                <Typography className="section1-contacts-item" variant="h4" color="textPrimary">
                  <Phone /> +33 7 86 65 45 20
                </Typography>
               </Grid>
                <Grid item>
                  <Typography className="section1-contacts-item" variant="h4" color="textPrimary">
                    <LocationOn/>Full Remote
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4} className="container-section1-item section1-about">
              <Typography paragraph={true} color="textPrimary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at nibh et ligula pellentesque tempor. Phasellus nibh justo, venenatis a lectus ut, hendrerit sollicitudin nibh. Aenean non ex a lorem eleifend efficitur vitae feugiat urna. Vestibulum pharetra, lacus eu gravida iaculis, diam dui finibus lectus, sit amet congue lectus libero at turpis. Donec hendrerit nisl vitae blandit commodo. Duis sed faucibus ante. <br/>
              </Typography>
              <Typography color="textPrimary">
                In at nibh et ligula pellentesque tempor. Phasellus nibh justo, venenatis a lectus ut, hendrerit sollicitudin nibh. Aenean non ex a lorem eleifend efficitur vitae feugiat urna. Vestibulum pharetra, lacus eu gravida iaculis, diam dui finibus lectus, sit amet congue lectus libero at turpis. Donec hendrerit nisl vitae blandit commodo. Duis sed faucibus ante.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="vertical-section"> - </Grid>
        <Grid item className="vertical-section">
          <Grid container className="container-section3" direction="row" justify="space-between">
            <Grid item sm={3} className="container-section3-item">
              <Typography variant="h3" color="primary">Neo9</Typography>
              <Typography variant="subtitle2" color="textSecondary">2016 - 2017</Typography>
              <Typography paragraph={true} color="textPrimary">
                Refonte du site e-commerce Pixmania.com<br/>
                Contribution aux développements du site neo9.fr 
              </Typography>
                <ul>
                  <li>nodejs - angularjs - ngnix - mongodb - elasticsearch - jenkins - unix - git</li>
              </ul>

            </Grid>
            <Grid item sm={3} className="container-section3-item">
              <Typography variant="h3" color="primary">LikeWeb A.</Typography>
              <Typography variant="subtitle2" color="textSecondary">2017</Typography>
              <Typography paragraph={true} color="textPrimary">
                Développement d'une application mobile hybride destiné aux médecins qui s'en serviront pour échanger leurs disponibilités. Les absents pourront alors être remplacé et maintenir leur activité.              </Typography>

                <ul>
                  <li>ionic - typescript - nodejs - angularjs - mongodb</li>
              </ul>

            </Grid>
            <Grid item sm={3} className="container-section3-item">
              <Typography variant="h3" color="primary">Pickme</Typography>
              <Typography variant="subtitle2" color="textSecondary">2020</Typography>
              <Typography paragraph={true} color="textPrimary">
                Création de toute la partie backend du projet<br/>
                Contribution au développement de l'application mobile<br/>
                Interfacer avec les différents transporteur et e-commerçant              </Typography>
                <ul>
                  <li>typescript - graphql - postgresql - typeorm - aws</li>
              </ul>
            </Grid>
            <Grid item sm={3} className="container-section3-item">
              <Typography variant="h3" color="primary">Wemaintain</Typography>
              <Typography variant="subtitle2" color="textSecondary">2018 - 2020</Typography>
              <Typography paragraph={true} color="textPrimary">
                Architecturer les différents modèles de données pour les clients, les techniciens d'ascenseur, les équipes internes opérationnel, à travers des différents platformes et application mobile
              </Typography>
                <ul>
                  <li>gPRC - graphql - typeorm</li>
                  <li>typescript - nestjs - postgesql</li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
    </ThemeProvider>
  );
}

export default App;
