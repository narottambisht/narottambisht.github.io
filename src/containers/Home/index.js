import moment                                                 from "moment";
import { Rating }                                             from "@material-ui/lab";
import React, { useContext, useEffect }                       from "react";
import { Card, CardContent, CardHeader, Chip, Divider, Grid } from "@material-ui/core";
import homeStyles                                             from "./styles";
import { firestoreDB }                                        from "../../utils/FirebaseConfig";
import { SkillsContext }                                      from "../../context/SkillsContext";
import { WorkExperienceContext }                              from "../../context/WorkExperienceContext";
import { StarBorderIcon }                                     from "../../utils/MaterialIcons";
import { calcYearsOfExperience }                              from "../../utils/config-util";
import { RemoteConfigContext }                                from "../../context/RemoteConfigContext";

const Home = (props) => {
  const [skills, setSkills]                 = useContext(SkillsContext),
        [workExperience, setWorkExperience] = useContext(WorkExperienceContext),
        [remoteConfigStore]                 = useContext(RemoteConfigContext),
        classes                             = homeStyles();

  useEffect(() => {
    firestoreDB.collection("skills").onSnapshot(snapshot => {
      setSkills(snapshot.docs.map(doc => doc.data()));
    });

    firestoreDB.collection("work_experience").onSnapshot(snapshot => {
      let workExperience = snapshot.docs.reverse();
      setWorkExperience(workExperience.map(doc => doc.data()));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={2} className={classes.containerGrid}>
        <Grid item lg={8} sm={12}>
          <Grid item lg={12} sm={12} style={{ marginBottom: 15 }}>
            <Card>
              <CardHeader title={"🕴️ PROFILE"}/>
              <Divider/>
              <CardContent style={{ textAlign: "justify" }}>
                <span>{`Hello! I am Narottam and I am a Software Engineer working on web applications and web infrastructure. I have been working professionally for ${calcYearsOfExperience(
                  workExperience)} years but tinkering since a kid.`}</span>
                <br/>
                {
                  remoteConfigStore.profile_points &&
                  remoteConfigStore.profile_points.length > 0 &&
                  remoteConfigStore.profile_points.map((_profile, index) => {
                    return (
                      <React.Fragment key={index}>
                        <span>{_profile}</span>
                        <br/>
                      </React.Fragment>
                    )
                  })
                }
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={12} sm={12}>
            <Card>
              <CardHeader title={"👨‍💻 WORK EXPERIENCE"}/>
              <Divider/>
              <CardContent style={{ textAlign: "justify" }}>
                {workExperience.length > 0 &&
                workExperience.reverse().map((_workExperience, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div>
                        <strong>
                          {_workExperience.designation} - &nbsp;
                          <a
                            style={{ color: "inherit", marginRight: 5 }}
                            rel="noopener noreferrer"
                            target="_blank"
                            href={_workExperience.website}>
                            {_workExperience.company_name}
                          </a>
                          ({moment(_workExperience.start_date.toDate()).
                          format("MMM YYYY")} - {_workExperience.end_date ? moment(
                          _workExperience.end_date.toDate()).format("MMM YYYY") : "Current"})
                        </strong>
                        <div dangerouslySetInnerHTML={{ __html: _workExperience.job_description }}/>
                      </div>
                      {
                        index + 1 !== workExperience.length &&
                        <Divider style={{ marginBottom: 10 }}/>
                      }
                    </React.Fragment>
                  )
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item lg={4} sm={12}>
          <Grid item style={{ marginBottom: 15 }}>
            <Card>
              <CardHeader title={"🛠 SKILLS"}/>
              <Divider/>
              <CardContent style={{ textAlign: "justify" }}>
                {remoteConfigStore.skill_description}
              </CardContent>
              <Divider/>
              <div style={{ marginLeft: 10, marginRight: 10 }}>
                {
                  skills &&
                  skills.length > 0 &&
                  skills.map((skill, index) => {
                    return (
                      <React.Fragment key={index}>
                        <p style={{ textAlign: "center" }}>{skill.skill_category}</p>
                        <div className={classes.skillsSection}>
                          {
                            skill.skills_array.map((_skill, index) => {
                              return (
                                <Chip key={index} color="primary" label={_skill.skill_name}/>
                              )
                            })
                          }
                        </div>
                        {index + 1 !== skills.length && <Divider/>}
                      </React.Fragment>
                    )
                  })
                }
              </div>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardHeader title={"🌏 LANGUAGES"}/>
              <Divider/>
              <CardContent>
                {
                  remoteConfigStore.language &&
                  remoteConfigStore.language.map((_language, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div style={{ display: "grid" }}>
                          <span><strong>{_language.lang_name}:</strong>&nbsp;{_language.expertise_level}</span>
                          <Rating
                            name="customized-empty"
                            defaultValue={_language.rating}
                            precision={0.5}
                            emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                          />
                        </div>
                        {
                          index + 1 !== remoteConfigStore.language.length &&
                          <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
                        }
                      </React.Fragment>
                    )
                  })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Home;
