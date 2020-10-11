import React, { useState, useEffect } from 'react';
import { Grid, Card, Divider, CardHeader, CardContent, TextField, Button } from '@material-ui/core';

import contactMeStyles from "./style";
import { firestoreDB, timeStamp } from "../../utils/FirebaseConfig";
import { nameError, emailError, messageError, nameFieldPlaceholder, emailFieldPlaceholder, messageFieldPlaceholder } from "../../utils/strings";
import MSnackbar from '../../components/MSnackbar';

const ContactMe = () => {
  const [contactMeForm, setContactMeForm] = useState({ name: '', email: '', message: '', nameError: '', emailError: '', messageError: '' });

  const [snackStatus, setSnackStatus] = useState(false);

  const classes = contactMeStyles();

  const textInputHandler = (event) => {
    const { name, value } = event.target;
    setContactMeForm({ ...contactMeForm, [name]: value });
  }

  const submitContactMeForm = () => {
    setContactMeForm({ ...contactMeForm, nameError: '', emailError: '', messageError: '' });
    const { name, email, message } = contactMeForm;
    const nameRegex = /^[a-zA-Z '.-]*$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const contactCollectionRef = firestoreDB.collection('contact-data');
    let isValidated = true, _nameError = '', _emailError = '', _messageError = '';

    if (!nameRegex.test(name) || name === '') {
      isValidated = false;
      _nameError = nameError;
    }

    if (!emailRegex.test(email)) {
      isValidated = false;
      _emailError = emailError;
    }

    if (message === '') {
      isValidated = false;
      _messageError = messageError;
    }

    if (isValidated) {
      const createdAt = timeStamp();
      contactCollectionRef.add({ name, email, message, createdAt })
        .then(docRef => {
          if (docRef.id)
            setSnackStatus(true);
          setContactMeForm({ name: '', email: '', message: '', nameError: '', emailError: '', messageError: '' });
        })
        .catch(err => {
          console.log('err', err);
        });
    } else {
      setContactMeForm({ ...contactMeForm, nameError: _nameError, emailError: _emailError, messageError: _messageError });
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
        message={'YOUR RESPONSE HAS BEEN SUBMITTED SUCCESSFULLY !'}
        snackStatus={snackStatus}
        closeSnack={handleCloseSnack}
        severity="success"
      />
      <Grid item lg={8} sm={12} xs={12}>
        <Grid item lg={12} sm={12} style={{ marginBottom: 15 }}>
          <Card>
            <CardHeader title={'🕴️ CONTACT ME'} />
            <Divider />
            <CardContent>
              <form noValidate autoComplete="off" style={{ display: 'grid' }}>
                <TextField label="Name"
                  name="name"
                  size="small"
                  margin="normal"
                  variant="outlined"
                  value={contactMeForm.name}
                  onChange={textInputHandler}
                  placeholder={nameFieldPlaceholder}
                  helperText={contactMeForm.nameError}
                  error={contactMeForm.nameError === '' ? false : true}
                />

                <TextField name="email"
                  label="Email"
                  size="small"
                  margin="normal"
                  variant="outlined"
                  onChange={textInputHandler}
                  value={contactMeForm.email}
                  placeholder={emailFieldPlaceholder}
                  helperText={contactMeForm.emailError}
                  error={contactMeForm.emailError === '' ? false : true}
                />

                <TextField name="message"
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
                  error={contactMeForm.messageError === '' ? false : true}
                />

                <Button variant="contained" onClick={submitContactMeForm}>Hit it up..!!</Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item lg={4} sm={12}>

      </Grid>
    </Grid>
  )
}

export default ContactMe;
