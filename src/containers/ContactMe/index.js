import React from 'react';
import { Grid, Card, Divider, CardHeader, CardContent, TextField, Button } from '@material-ui/core';

import contactMeStyles from "./style";

const ContactMe = () => {
  const classes = contactMeStyles();
  return (
    <Grid container spacing={2} className={classes.containerGrid}>
      <Grid item lg={8} sm={12}>
        <Grid item lg={12} sm={12} style={{ marginBottom: 15 }}>
          <Card>
            <CardHeader title={'🕴️ CONTACT ME'} />
            <Divider />
            <CardContent>
              <form noValidate autoComplete="off" style={{ display: 'grid' }}>
                <TextField label="Name"
                  placeholder="Tell me who you are, bruh!!"
                  id="name"
                  margin="normal"
                  variant="outlined"
                  // helperText={'343l43kljlk'}
                  // error={true}
                  size="small"
                />
                <TextField id="email"
                  placeholder="How can I reach you back"
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  size="small"
                />
                <TextField id="message"
                  label="Message"
                  margin="normal"
                  placeholder="You wanna say something to me, or you just chillin..!!"
                  multiline
                  rows={4}
                  size="small"
                  variant="outlined"
                />

                <Button></Button>
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
