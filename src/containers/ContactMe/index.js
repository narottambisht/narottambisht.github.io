import lottie                                     from "lottie-web";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Tooltip,
  Typography,
}                                                 from "@material-ui/core";
import {
  emailError,
  emailFieldPlaceholder,
  messageError,
  messageFieldPlaceholder,
  nameError,
  nameFieldPlaceholder,
}                                                 from "../../utils/strings";
import contactMeStyles                            from "./style";
import { SocialPartyContext }                     from "../../context/SocialPartyContext";
import MSnackbar                                  from "../../components/MSnackbar";
import { firestoreDB, timeStamp }                 from "../../utils/FirebaseConfig";

const ContactMe = () => {
  const [snackStatus, setSnackStatus] = useState(false);
  const [contactMeForm, setContactMeForm] = useState({
    name        : "",
    email       : "",
    message     : "",
    nameError   : "",
    emailError  : "",
    messageError: "",
  });

  const [socialParty, setSocialParty] = useContext(SocialPartyContext);

  useEffect(() => {
    firestoreDB.collection("social-party").onSnapshot(snapshot => {
      setSocialParty(snapshot.docs.map(doc => {
        let social = doc.data();
        social["id"] = doc.id;
        return social;
      }))
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socialParty.length > 0) {
      socialParty.forEach(social => lottie.loadAnimation({
        container: document.getElementById(`${social.id}-lottie`),
        renderer : "svg",
        loop     : true,
        autoplay : true,
        path     : `images/${social.id}.json`,
      }));
    }
  }, [socialParty])

  const classes = contactMeStyles();

  const textInputHandler = (event) => {
    const { name, value } = event.target;
    setContactMeForm({ ...contactMeForm, [name]: value });
  }

  const submitContactMeForm = () => {
    setContactMeForm({ ...contactMeForm, nameError: "", emailError: "", messageError: "" });
    const { name, email, message } = contactMeForm;
    const nameRegex = /^[a-zA-Z '.-]*$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const contactCollectionRef = firestoreDB.collection("contact-data");
    let isValidated = true, _nameError = "", _emailError = "", _messageError = "";

    if (!nameRegex.test(name) || name === "") {
      isValidated = false;
      _nameError = nameError;
    }

    if (!emailRegex.test(email)) {
      isValidated = false;
      _emailError = emailError;
    }

    if (message === "") {
      isValidated = false;
      _messageError = messageError;
    }

    if (isValidated) {
      const createdAt = timeStamp();
      contactCollectionRef.add({ name, email, message, createdAt }).then(docRef => {
        if (docRef.id)
          handleOpenSnack();
        setContactMeForm(
          { name: "", email: "", message: "", nameError: "", emailError: "", messageError: "" });
      }).catch(err => {
        console.log("err", err);
      });
    } else {
      setContactMeForm({
        ...contactMeForm,
        nameError   : _nameError,
        emailError  : _emailError,
        messageError: _messageError,
      });
    }
  }

  const handleOpenSnack = () => {
    setSnackStatus(true);
  }

  const handleCloseSnack = () => {
    setSnackStatus(false);
  }

  return (
    <Grid container spacing={2} className={classes.containerGrid}>
      <MSnackbar
        message={"YOUR RESPONSE HAS BEEN SUBMITTED SUCCESSFULLY !"}
        snackStatus={snackStatus}
        closeSnack={handleCloseSnack}
        severity="success"
      />
      <Grid item lg={8} sm={12} xs={12}>
        <Grid item lg={12} sm={12} style={{ marginBottom: 15 }}>
          <Card>
            <CardHeader title={"🕴️ Get In Touch"}/>
            <Divider/>
            <CardContent>
              <Typography>
                Although I'm not currently looking for any new opportunities, my inbox is always
                open. Whether you have a question or just want to say hi, I'll try my best to get
                back to you!
              </Typography>
              <form noValidate autoComplete="off" style={{ display: "grid" }}>
                <TextField
                  label="Name"
                  name="name"
                  size="small"
                  margin="normal"
                  variant="outlined"
                  value={contactMeForm.name}
                  onChange={textInputHandler}
                  placeholder={nameFieldPlaceholder}
                  helperText={contactMeForm.nameError}
                  error={contactMeForm.nameError !== ""}
                />

                <TextField
                  name="email"
                  label="Email"
                  size="small"
                  margin="normal"
                  variant="outlined"
                  onChange={textInputHandler}
                  value={contactMeForm.email}
                  placeholder={emailFieldPlaceholder}
                  helperText={contactMeForm.emailError}
                  error={contactMeForm.emailError !== ""}
                />

                <TextField
                  name="message"
                  rows={4}
                  multiline
                  size="small"
                  label="Message"
                  margin="normal"
                  variant="outlined"
                  onChange={textInputHandler}
                  value={contactMeForm.message}
                  placeholder={messageFieldPlaceholder}
                  helperText={contactMeForm.messageError}
                  error={contactMeForm.messageError !== ""}
                />

                <Button variant="contained" color={"primary"} onClick={submitContactMeForm}>Hit it
                  up..!!</Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={12} sm={12} style={{ marginBottom: 15 }}>
          <Card>
            <CardHeader title={"🕴️ My social handles"}/>
            <Divider/>
            <CardContent>
              <Grid container>
                {
                  socialParty.map(social => {
                    return (
                      <Grid item lg={4} md={4} sm={12} xs={12}
                            onClick={() => window.open(social.social_link, "_blank")}>
                        <Tooltip title={social.tooltip}>
                          <div id={`${social.id}-lottie`} className={classes.lottieAnimationDiv}/>
                        </Tooltip>
                      </Grid>
                    )
                  })
                }

                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <div id="instagram-lottie" className={classes.lottieAnimationDiv}/>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item lg={4} sm={12}>
        <Grid item lg={12} sm={12} style={{ marginBottom: 15 }}>
          <Card>
            <CardHeader title={"🕴️ HIRE ME"}/>
            <Divider/>
            <CardContent>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ContactMe;
