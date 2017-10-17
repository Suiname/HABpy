import React from 'react';
const ReactDOM = require('react-dom');
import fetch from 'isomorphic-fetch';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';

class LoginPage extends React.Component {
    constructor() {
        super();
    }
    render() {
        const { classes, loggedIn, token, handleChange, onSubmit } = this.props;
            return(
                  
                      <Grid container spacing={8} className={classes.root} justify="center" align="stretch">
                          <Grid item xs={12} l={6} className={classes.loginForm}>
                            <FormControl className={classes.formControl}>
                                <Grid item xs={12} l={6}>
                                    <TextField
                                    id="username"
                                    label="username"
                                    value={this.props.username}
                                    onChange={handleChange('username')}
                                    margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} l={6}>
                                    <TextField
                                    id="password"
                                    label="password"
                                    value={this.props.password}
                                    onChange={handleChange('password')}
                                    margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button raised color="primary" className={classes.button} onClick={onSubmit}>
                                        Log in
                                    </Button>
                                </Grid>
                            </FormControl>
                          </Grid>
                      </Grid>               
            );
    }
}

export default LoginPage;