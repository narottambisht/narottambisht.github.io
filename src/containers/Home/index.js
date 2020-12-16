import moment                                                 from 'moment';
import { Rating }                                             from '@material-ui/lab';
import React, { useContext, useEffect }                       from 'react';
import { Card, CardContent, CardHeader, Chip, Divider, Grid } from '@material-ui/core';

import homeStyles                                                                       from './styles';
import { firestoreDB }                                                                  from '../../utils/FirebaseConfig';
import { SkillsContext, PortfolioInfoContext, WorkExperienceContext, TechStackContext } from '../../context';
import { StarBorderIcon }                                                               from '../../utils/MaterialIcons';
import { calcYearsOfExperience }                                                        from '../../utils/config-util';
import { experience }                                                                   from '../../utils/strings';

const Home = (props) => {
  const [skills, setSkills]                 = useContext(SkillsContext);
  const [portfolioInfoStore]                = useContext(PortfolioInfoContext);
  const [workExperience, setWorkExperience] = useContext(WorkExperienceContext);
  const [techStack, setTechStack]           = useContext(TechStackContext);
  const classes                             = homeStyles();

  useEffect(() => {
    firestoreDB.collection('work_experience').onSnapshot(snapshot => {
      let workExperience = snapshot.docs.reverse();
      setWorkExperience(workExperience.map(doc => doc.data()));
    });

    // Fetch tech stack collection to show in the skills section of the home page
    firestoreDB.collection('tech_stack').onSnapshot(snapshot => {
      let skillsMap = {};
      snapshot.docs.forEach(doc => {
        let tech = doc.data();
        if (tech.tech_category) {
          tech.tech_category.get().then(techCategory => {
            let { category_name } = techCategory.data();
            tech.techCategory     = techCategory.data();
            if (!skillsMap.hasOwnProperty(category_name)) {
              let techCat = [];
              techCat.push(tech);
              skillsMap[category_name] = techCat;
            } else {
              let techCat = skillsMap[category_name];
              techCat.push(tech);
              skillsMap[category_name] = techCat;
            }
          });
        }
      });

      setTechStack(skillsMap);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const TechStack = () => {
    let techArray         = [];
    let techStackKeyArray = Object.keys(techStack);
    if (techStackKeyArray.length > 0) {
      techArray = techStackKeyArray.map((skill, index) => {
        return (
          <React.Fragment key={index}>
            <p style={{ textAlign: 'center' }}>{skill.skill_category}</p>
            <div className={classes.skillsSection}>
              {skill.skills_array.map((_skill, index) => {
                return (
                  <Chip key={index} color="primary" label={_skill.skill_name}/>
                )
              })}
            </div>
            {index + 1 !== skills.length && <Divider/>}
          </React.Fragment>
        )
      });
    }
    return techArray;
  }

  return (
    <React.Fragment>
      <Grid container spacing={2} className={classes.containerGrid}>
        <Grid item lg={8} sm={12}>
          <Grid item lg={12} sm={12} style={{ marginBottom: 15 }}>
            <Card>
              <CardHeader title={'🕴️ PROFILE'}/>
              <Divider/>
              <CardContent style={{ textAlign: 'justify' }}>
                <span>{experience(calcYearsOfExperience(workExperience))}</span>
                <br/>
                {portfolioInfoStore.profile && portfolioInfoStore.profile.length > 0 && portfolioInfoStore.profile.map((_profile, index) => {
                  return (
                    <React.Fragment key={index}>
                      <span>{_profile}</span>
                      <br/>
                    </React.Fragment>
                  )
                })}
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={12} sm={12}>
            <Card>
              <CardHeader title={'👨‍💻 WORK EXPERIENCE'}/>
              <Divider/>
              <CardContent style={{ textAlign: 'justify' }}>
                {workExperience.length > 0 && workExperience.reverse().map((_workExperience, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div>
                        <strong>
                          {_workExperience.designation} - &nbsp;
                          <a style={{ color: 'inherit', marginRight: 5 }}
                             rel="noopener noreferrer"
                             target="_blank"
                             href={_workExperience.website}>
                            {_workExperience.company_name}
                          </a>
                          ({moment(_workExperience.start_date.toDate()).format('MMM YYYY')} - {_workExperience.end_date ? moment(_workExperience.end_date.toDate()).format('MMM YYYY') : "Current"})
                        </strong>
                        <div dangerouslySetInnerHTML={{ __html: _workExperience.job_description }}/>
                      </div>
                      {index + 1 !== workExperience.length && <Divider style={{ marginBottom: 10 }}/>}
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
              <CardHeader title={'🛠 SKILLS'}/>
              <Divider/>
              <CardContent style={{ textAlign: 'justify' }}>
                {portfolioInfoStore.skills_description}
              </CardContent>
              <Divider/>
              <div style={{ marginLeft: 10, marginRight: 10 }}>
                <TechStack/>
              </div>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardHeader title={'🌏 LANGUAGES'}/>
              <Divider/>
              <CardContent>
                {portfolioInfoStore.languages && portfolioInfoStore.languages.map((_language, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div style={{ display: 'grid' }}>
                        <span><strong>{_language.lang_name}:</strong>&nbsp;{_language.expertise_level}</span>
                        <Rating
                          readOnly={true}
                          name="customized-empty"
                          defaultValue={_language.rating}
                          precision={0.5}
                          emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                        />
                      </div>
                      {index + 1 !== portfolioInfoStore.languages.length &&
                      <Divider style={{ marginTop: 10, marginBottom: 10 }}/>}
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