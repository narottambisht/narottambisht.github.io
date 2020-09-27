import React from 'react';
import {neonButtonStyles} from './style';

const NeonButton = () => {
  const classes = neonButtonStyles();

  return (
    <div>
      <a href="#" className={classes.anchorTag}>
        <span className={classes.firstSpan}></span>
        <span className={classes.secondSpan}></span>
        <span className={classes.thirdSpan}></span>
        <span  className={classes.fourthSpan}></span>
        View More
      </a>
    </div>
  )
}

export default NeonButton;