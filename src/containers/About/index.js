import React, { useEffect, useContext } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core';

import aboutStyles from './styles';
import { AboutContext } from '../../context/AboutContext';
import { useAboutController } from '../../utils/firebase-controller';

const About = () => {
  const [aboutStore, setAboutStore] = useContext(AboutContext);
  const classes = aboutStyles();
  useAboutController();

  return (
    <React.Fragment>
      <Grid container spacing={2} className={classes.containerGrid}>
        <Grid item lg={8} sm={12}>
          <Grid item lg={12} sm={12} style={{ marginBottom: 15 }}>
            <Card>
              <CardHeader title="ABOUT ME" />
              <Divider />
            </Card>
          </Grid>
          <Grid item lg={12} sm={12}>
            <Card>
              <CardHeader title="FUTURE GOALS" />
              <Divider />
              <CardContent>
                {aboutStore.future_goals && aboutStore.future_goals.goals_array.map(_goal => {
                  return (
                    <React.Fragment>
                      <Typography variant="subtitle1" paragraph={true}>
                        {_goal.goal_title}
                      </Typography>
                      <Typography variant="subtitle2" component="div" gutterBottom={true}>
                        {_goal.goal_description}
                      </Typography>
                      <Divider />
                    </React.Fragment>
                  )
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item lg={4} sm={12}>
          <Grid item lg={12} sm={12}>
            <Card>
              <CardHeader title="DETAILS" />
              <Divider />
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ fontWeight: 'bold' }}>Date of birth</div>
                  <div>{aboutStore.about_me}</div>
                </div>
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                  <div style={{ fontWeight: 'bold' }}>Nationality</div>
                  <div>Indian</div>
                </div>
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                  <div style={{ fontWeight: 'bold' }}>Marrital Status</div>
                  <div>Unmarried</div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default About;
