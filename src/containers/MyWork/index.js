import React, { useEffect, useState } from 'react';
import { Grid, Card, CardHeader, Divider } from '@material-ui/core';

import myWorkStyles from './styles';
import OwlSlider from '../../components/OwlSlider';
import { firestoreDB } from '../../utils/FirebaseConfig';

const MyWork = props => {
  const [projects, setProjects] = useState([]);
  const classes = myWorkStyles();

  useEffect(() => {
    firestoreDB.collection('projects').onSnapshot(snapshot => {
      setProjects(snapshot.docs.map(doc => doc.data()));
    });
  }, [])

  const projectResponsiveOptions = {
    0: {
      items: 1, nav: false, loop: true
    },
    380: {
      items: 1.2, nav: false, loop: true
    },
    768: {
      items: 1.1, nav: false, loop: true
    },
    1024: {
      items: 2, nav: false, loop: true
    },
    1360: {
      items: 3.8, nav: false, loop: true
    },
    1440: {
      items: 4.2, nav: false, loop: true
    }
  }

  return (
    <Grid container spacing={2} className={classes.containerGrid}>
      <Grid item lg={12} sm={12}>
        <Card>
          <CardHeader title={'🕴️ MY WORK'} />
          <Divider />
          <OwlSlider responsiveOption={projectResponsiveOptions}>
            {projects.map(project => {
              return (
                <div style={{ border: '1px solid', borderColor: 'primary', padding: 20 }}>
                  <img src={project.project_logo} style={{ width: 200, height: 80 }} />
                  <p style={{ fontWeight: 'bold' }}>{project.project_name}</p>
                </div>
              )
            })}
          </OwlSlider>
          <div style={{ marginTop: 30 }} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MyWork
