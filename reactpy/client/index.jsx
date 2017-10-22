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
import AppBar from './components/AppBar';
import loginBg from '../assets/images/loginbg.png';
import mainbg from '../assets/images/mainbg.jpg';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

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
        size: 'auto',
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
  AppBarContainer: {
      height: '100%',
  },
  MainPage: {
    height: '100%',
    backgroundImage: `url(${mainbg})`,
    background: {
        repeat: 'no-repeat',
        position: 'center center fixed',
        size: 'cover',
    }
  },
  MainPageColumn: {
      height: '100%',
  },
  Content: {
    height: '100%',
  },
  Paper: {
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 8,
    marginLeft: 8,
  },
});

class App extends React.Component {
    constructor(props) {
        super(props);
        console.log('props: ', props);
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
        return(
            <Switch>
                <Route exact path='/' render={(props) => ( loggedIn ?
                    <Redirect to="/main"/> :
                    <Login classes={classes} handleChange={this.handleChange} onSubmit={this.onSubmit} username={username} password={password} token={token} loggedIn={loggedIn} />
                )}/>
                <Route path='/main' render={ (props) => (
                    <MainPage classes={classes} token={token} />
                )}/>
            </Switch>
        );
    }
}

const MainPage = (props) => {
    const { token, classes } = props;
    return (
        <div className={classes.AppBarContainer}>
            <AppBar />
            <Main token={ token } classes={ classes } />
        </div>
    );
};

const StyledApp = withStyles(styles)(App)

ReactDOM.render(<MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <StyledApp/>
        </BrowserRouter>
    </MuiThemeProvider>, 
    document.getElementById('container'))