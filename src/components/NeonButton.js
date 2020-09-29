import React from 'react';
import { neonButtonStyles } from './style';

const NeonButton = ({ onClick }) => {
  const classes = neonButtonStyles();

  return (
    <a className={classes.anchorTag} onClick={onClick}>
      <span className={classes.firstSpan}></span>
      <span className={classes.secondSpan}></span>
      <span className={classes.thirdSpan}></span>
      <span className={classes.fourthSpan}></span>
        View More
    </a>
  )
}

export default NeonButton;