import React        from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert     from '@material-ui/lab/Alert';

const MSnackbar = ({ message, snackStatus, closeSnack, severity }) => {

  return (
    <Snackbar
      autoHideDuration={4000}
      // TransitionComponent={(props) => {
      //   return <Slide {...props} direction="right" />
      // }}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={snackStatus}
      onClose={closeSnack}
    >
      <MuiAlert severity={severity} elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

export default MSnackbar;
