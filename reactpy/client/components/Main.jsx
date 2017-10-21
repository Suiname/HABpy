import React from 'react'
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import ipsum from './ipsum';

const MainPage = (props) => {
  const { token, classes } = props;
  return (
    <div className={classes.MainPage}>
        <Grid container spacing={8} className={classes.Content} justify="center" direction="row" alignItems="center">
            <Grid item xs={12} lg={4} className={classes.MainPageColumn}>
                <Paper className={classes.Paper} elevation={4}>
                    <Typography type="headline" component="h3" align="center">
                        Welcome to History at Bat
                    </Typography>
                    <Typography type="body1" component="p">
                        {ipsum}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={4} className='middle'>
                <Paper className={classes.Paper} elevation={4}>
                    <Typography type="headline" component="h3" align="center">
                        Current and Upcoming Leagues
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={4} className='right'>
            <Paper className={classes.Paper} elevation={4}>
                    <Typography type="headline" component="h3" align="center">
                        Past League History
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    </div>
  );
}

export default MainPage;
