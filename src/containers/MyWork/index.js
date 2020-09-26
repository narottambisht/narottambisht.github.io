import $ from 'jquery';
import React, { useEffect, useState, useRef } from 'react';
import { Grid, Card, CardHeader, Divider, CssBaseline, Typography, CardContent } from '@material-ui/core';

import DancingText from '../../components/DancingText';
import myWorkStyles from './styles';
import { firestoreDB } from '../../utils/FirebaseConfig';

const MyWork = props => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const classes = myWorkStyles();

  const projectVideoRef = useRef();
  const projectVideoSourceRef = useRef();

  useEffect(() => {
    firestoreDB.collection('projects').onSnapshot(snapshot => {
      setProjects(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  useEffect(() => {
    if (selectedProject) {
      projectVideoSourceRef.current.setAttribute('src', selectedProject.screencast_url);
      projectVideoRef.current.load();
      $('html,body').animate({
        scrollTop: $("#projectInfo").offset().top - 80
      },
        'slow');
    }
  }, [selectedProject]);

  return (
    <Grid container spacing={2} className={classes.containerGrid}>
      <CssBaseline />
      <Grid item lg={12} sm={12}>
        <Card>
          <CardHeader title={'🕴️ MY WORK'} />
          <Divider />
          <CardContent>
            <Grid container item spacing={2}>
              {projects.map((project, index) => {
                return (
                  <Grid item lg={4} sm={12} key={index} className={classes.projectGrid}
                    onClick={() => setSelectedProject(project)}>
                    <div className={classes.projectLogo}>
                      <img src={project.project_logo} />
                    </div>
                    <Divider />
                    <Typography variant="subtitle1" className={classes.projectName}>{project.project_name}</Typography>
                    <Typography variant="subtitle2" className={classes.projectDescription} dangerouslySetInnerHTML={{ __html: project.description }} />
                  </Grid>
                )
              })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {selectedProject &&
        <Grid item lg={12} sm={12} id="projectInfo">
          <Card>
            <CardContent>
              <Grid container item lg={12} sm={12} spacing={3}>
                <Grid item lg={4} sm={12}>
                  <img src={selectedProject.project_logo} />
                </Grid>
                <Grid item lg={8} sm={12}>
                  <Typography variant="subtitle2" dangerouslySetInnerHTML={{ __html: selectedProject.description }} />
                </Grid>
                <Grid item lg={12} sm={12}>
                  <video ref={projectVideoRef} width={"100%"} height={400} controls controlsList="nodownload">
                    <source ref={projectVideoSourceRef} />
                  </video>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      }
    </Grid >
  )
}

export default MyWork
