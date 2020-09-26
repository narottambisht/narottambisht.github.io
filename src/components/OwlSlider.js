import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const OwlSlider = props => {
  return (
    <React.Fragment>
      <OwlCarousel
        nav={true}
        margin={20}
        loop={false}
        rewind={true}
        center={true}
        autoplay={true}
        autoplayTimeout={2000}
        autoplayHoverPause={true}
        responsive={props.responsiveOption}>
        {props.children}
      </OwlCarousel>
    </React.Fragment>
  )
}

export default OwlSlider;