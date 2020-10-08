import React, { useState } from 'react';
import { Grid, Card, Divider, CardHeader, CardContent, TextField, Button } from '@material-ui/core';

import contactMeStyles from "./style";
import { nameError, emailError, messageError, nameFieldPlaceholder, emailFieldPlaceholder, messageFieldPlaceholder } from "../../utils/strings";

const ContactMe = () => {
  const [contactMeForm, setContactMeForm] = useState({ name: '', email: '', message: '', nameError: '', emailError: '', messageError: '' });
  const classes = contactMeStyles();

  const textInputHandler = (event) => {
    const { name, value } = event.target;
    setContactMeForm({ ...contactMeForm, [name]: value });
  }

  const submitContactMeForm = () => {
    setContactMeForm({ nameError: '', emailError: '', messageError: '' });
    const nameRegex = /^[a-zA-Z '.-]*$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isValidated = true, _nameError = '', _emailError = '', _messageError = '';

    if (!nameRegex.test(contactMeForm.name) || contactMeForm.name === '') {
      isValidated = false;
      _nameError = nameError;
    }

    if (!emailRegex.test(contactMeForm.email)) {
      isValidated = false;
      _emailError = emailError;
    }

    if (contactMeForm.message === '') {
      isValidated = false;
      _messageError = messageError;
    }

    if (isValidated) {
      console.log('form validated');
    } else {
      setContactMeForm({ ...contactMeForm, nameError: _nameError, emailError: _emailError, messageError: _messageError });
    }
  }

  return (
    <Grid container spacing={2} className={classes.containerGrid}>
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
