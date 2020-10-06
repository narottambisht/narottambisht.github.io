import React from 'react';
import { motion } from 'framer-motion';
import { imageGridStyles } from './style';

const ImageGrid = ({ setSelectedImg, imageArray }) => {
  const classes = imageGridStyles();

  return (
    <div className={classes.imgGrid}>
      {imageArray && imageArray.map((_image, index) => (
        <motion.div className={classes.imgWrap} key={index}
          layout
          whileHover={{ opacity: 1 }}
          onClick={() => setSelectedImg(_image.achievement_image_url)}
        >
          <motion.img className={classes.image} src={_image.achievement_image_url} alt="uploaded pic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
      ))}
    </div>
  )
}

const ImageGridModal = ({ setSelectedImg, selectedImg }) => {
  const classes = imageGridStyles();
  
  const handleClick = (e) => {
    if (e.target.classList.contains(classes.modalBackdrop)) {
      setSelectedImg(null);
    }
  }

  return (
    <motion.div className={classes.modalBackdrop} onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img src={selectedImg} className={classes.modalBackdropImg} alt="enlarged pic"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
    </motion.div>
  )
}

export { ImageGridModal, ImageGrid as default };