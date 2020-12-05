import $                                      from 'jquery';
import React, { useEffect, useState, useRef } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  Divider,
  CssBaseline,
  Typography,
  CardContent,
  Avatar,
  Button
}                                             from '@material-ui/core';

import myWorkStyles        from './styles';
import { privacyPolicy }   from '../../utils/strings';
import NeonButton          from '../../components/NeonButton';
import { firestoreDB }     from '../../utils/FirebaseConfig';
import { ScreenShareIcon } from '../../utils/MaterialIcons';

const MyWork = props => {
  const [projects, setProjects]               = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const classes                               = myWorkStyles();

  const projectVideoRef       = useRef();
  const projectVideoSourceRef = useRef();

  useEffect(() => {
    firestoreDB.collection('projects').onSnapshot(snapshot => {
      setProjects(snapshot.docs.map(doc => {
        let project = doc.data();
        if (project.technology) {
          let techArray = [];
          project.technology.map(tech => {
            tech.get().then(_projTech => {
              techArray.push(_projTech.data());
            });
          });
          project.tech = techArray;
        }
        return project;
      }));
    });
  }, []);

  useEffect(() => {
    if (selectedProject) {
      projectVideoSourceRef.current.setAttribute('src', selectedProject.screencast_url);
      projectVideoRef.current.load();

      $('html,body').animate({
          scrollTop: $("#projectInfo").offset().top
        },
        'slow');
    }
  }, [selectedProject]);

  return (
    <Grid container spacing={2} className={classes.containerGrid}>
      <CssBaseline/>
      <Grid item lg={12} sm={12}>
        <Card>
          <CardHeader title={'🕴️ MY WORK'}/>
          <Divider/>
          <CardContent>
            <Grid container item spacing={2}>
              {projects.map((project, index) => {
                return (
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    key={index}
                    onClick={() => setSelectedProject(project)}>
                    <div className={classes.projectLogo}>
                      <img src={project.project_logo} width={'100%'} alt={project.project_name}/>
                    </div>
                    <Divider/>
                    <Typography variant="subtitle1" className={classes.projectName}>{project.project_name}</Typography>
                    <Typography
                      variant="subtitle2"
                      className={classes.projectDescription}
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                    <NeonButton/>
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
                <img src={selectedProject.project_logo} width={'100%'} alt="project-logo"/>
              </Grid>
              <Grid item lg={8} sm={12}>
                <Typography variant="subtitle2" dangerouslySetInnerHTML={{ __html: selectedProject.description }}/>
                <Grid container item spacing={2} style={{ marginTop: 10 }}>
                  {
                    selectedProject.tech &&
                    selectedProject.tech.length > 0 &&
                    selectedProject.tech.map((_projTech, index) => {
                      return (
                        <Grid key={index} item lg={3}
                              md={3} sm={6} xs={6}
                              style={{ display: 'flex' }}
                              onClick={() => console.log("p", _projTech.tech_name)}>

                          <Avatar
                            alt="Cindy Baker"
                            className={classes.avatarLogo}
                            src={_projTech.tech_logo_url}
                            classes={{ img: classes.avatarImg }}/>

                          <div style={{ alignSelf: 'center', marginLeft: 10 }}>{_projTech.tech_name}</div>
                        </Grid>
                      )
                    })
                  }
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ScreenShareIcon/>}
                  onClick={() => window.open(selectedProject.website, "_blank")}
                  className={classes.websiteLinkButton}>Link to Website
                </Button>
              </Grid>
              <Grid item lg={12} sm={12}>
                <video ref={projectVideoRef} width={"100%"} height={"100%"} controls controlsList="nodownload">
                  <source ref={projectVideoSourceRef}/>
                </video>
              </Grid>
              {selectedProject.showPP &&
              <Grid item lg={12} md={12} sm={12}>
                <p className={classes.privacyPolicy}>
                  {privacyPolicy}
                </p>
              </Grid>
              }
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      }
    </Grid>
  )
}

export default MyWork
