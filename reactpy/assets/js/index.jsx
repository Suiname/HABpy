import React from 'react';
const ReactDOM = require('react-dom');
import fetch from 'isomorphic-fetch';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const theme = createMuiTheme({
    palette: {
      primary: purple, // Purple and green play nicely together.
      secondary: green,
      error: red,
    },
  });

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  centered: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  bordered: {
      border: {
          color: theme.palette.text.primary,
          width: 1,
          style: 'solid',
      },
  },
  loginForm: {
    padding: 16,
    textAlign: 'center',
    maxWidth: '400px',    
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '20vw',
    color: theme.palette.text.secondary,
    border: {
          color: theme.palette.text.primary,
          width: 1,
          style: 'solid',
      },
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = { username: '', password: '', token: '', loggedIn: false };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleChange(name) {
        return (event) => {
            console.log(`name: ${name}`);
            console.log(`event.target.value: ${event.target.value}`);
            this.setState({
            [name]: event.target.value,
            });
        }
    }
    onSubmit(){
        const { username, password } = this.state;
        fetch('/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then((payload) => {
            const { token } = payload;
            console.log('token: ', token);
            this.setState({ token, loggedIn: true });
        })
        .catch((error) => {
            console.log('error: ', error);
        })
    }
    
    render() {
        const { classes } = this.props;
        const { loggedIn, token } = this.state;
        if (!loggedIn) {
            return(
                <MuiThemeProvider theme={theme}>
                    <div className={classes.root}>
                        <Grid container spacing={8} className='content' justify="center">
                            <Grid item xs={12} l={6} className={classes.loginForm}>
                                <form className='loginForm' noValidate autoComplete="off">
                                    <Grid item xs={12} l={6}>
                                        <TextField
                                        id="username"
                                        label="username"
                                        value={this.state.username}
                                        onChange={this.handleChange('username')}
                                        margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} l={6}>
                                        <TextField
                                        id="password"
                                        label="password"
                                        value={this.state.password}
                                        onChange={this.handleChange('password')}
                                        margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button raised color="primary" className={classes.button} onClick={this.onSubmit}>
                                            Log in
                                        </Button>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </div>
                    
                </MuiThemeProvider>
            );
        } else {
            return <MainPage token={ token } />
        }
    }
}

const App = withStyles(styles)(LoginPage)

const MainPage = (props) => {
    const { token } = props;
    return (
        <MuiThemeProvider theme={theme}>
        <div className='mainPage'>
            <Grid container spacing={8} className='content' justify="center">
                <Grid item xs={12} l={6} className='token'>
                    <ul>
                        <li> {token} </li>
                    </ul>
                </Grid>
            </Grid>
        </div>
    </MuiThemeProvider>
    )
}

ReactDOM.render(<App/>, 
    document.getElementById('container'))