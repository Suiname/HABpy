import React from 'react';
const ReactDOM = require('react-dom');
import fetch from 'isomorphic-fetch';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import blueGrey from 'material-ui/colors/blueGrey';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Login from './components/Login';
import Main from './components/Main';
import loginBg from '../assets/images/loginbg.jpg';


const theme = createMuiTheme({
    palette: {
      primary: blueGrey,
      secondary: green,
      error: red,
    },
  });

const styles = theme => ({
  root: {
    marginTop: 30,
    backgroundImage: `url(${loginBg})`,
    background: {
        repeat: 'no-repeat',
        position: 'center center fixed',
        size: 'contain',
    },
    height: '100%',
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
    border: {
          color: theme.palette.text.primary,
          width: 1,
          style: 'solid',
      },
    background: 'white',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class App extends React.Component {
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
        const { loggedIn, token, username, password } = this.state;
        if (!loggedIn) {
            return(
                <Login classes={classes} handleChange={this.handleChange} onSubmit={this.onSubmit} username={username} password={password} token={token} loggedIn={loggedIn} />
            );
        } else {
            return <Main token={ token } classes={classes} />
        }
    }
}

const StyledApp = withStyles(styles)(App)

ReactDOM.render(<MuiThemeProvider theme={theme}>
        <StyledApp/>
    </MuiThemeProvider>, 
    document.getElementById('container'))