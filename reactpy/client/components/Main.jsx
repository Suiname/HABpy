import React from 'react'
import Grid from 'material-ui/Grid';

const MainPage = (props) => {
  const { token } = props;
  return (
    <div className='mainPage'>
        <Grid container spacing={8} className='content' justify="center">
            <Grid item xs={12} l={6} className='token'>
                <ul>
                    <li> {token} </li>
                </ul>
            </Grid>
        </Grid>
    </div>
  );
}

export default MainPage;
