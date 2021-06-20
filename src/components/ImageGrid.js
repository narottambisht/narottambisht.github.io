import React                      from "react";
import { motion }                 from "framer-motion";
import { imageGridStyles }        from "./style";
import { GridList, GridListTile } from "@material-ui/core";

const ImageGrid = ({ setSelectedImg, imageArray }) => {
  const classes = imageGridStyles();

  return (
    <div className={classes.imgGrid}>
      <GridList cellHeight={180} className={classes.gridList} cols={3}>
        {imageArray && imageArray.map((_image, index) => (
          <GridListTile
            key={index}
            cols={1}
            rows={_image.rows || 1}
            onClick={() => setSelectedImg(_image.achievement_image_url)}>
            <img src={_image.achievement_image_url} alt={_image.achievement_name}/>
          </GridListTile>
        ))}
      </GridList>
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
    <motion.div
      className={classes.modalBackdrop}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg}
        className={classes.modalBackdropImg}
        alt="enlarged pic"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
    </motion.div>
  )
}

export { ImageGridModal, ImageGrid as default };
