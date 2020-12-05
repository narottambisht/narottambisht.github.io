import React                from 'react';
import { neonButtonStyles } from './style';

const NeonButton = ({ onClick }) => {
  const classes = neonButtonStyles();

  return (
    <a className={classes.anchorTag} onClick={onClick}>
      <span className={classes.firstSpan}/>
      <span className={classes.secondSpan}/>
      <span className={classes.thirdSpan}/>
      <span className={classes.fourthSpan}/>
      View More
    </a>
  )
}

export default NeonButton;