import React from 'react';
import Slider from 'react-slick';
import '../../css/slider.css';

const HeroSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    
      <section>
        <div className="beautysec">
          <Slider {...settings} className="beauty-slider">
            <div className="item">
              <figure>
                <img src="/assets/images/slider01.jpg" alt="Jewellery" />
                <figcaption className="slider-text">
                  <h2>Jewellery</h2>
                  <h3>Exquisite Collection</h3>
                  <a href="#" className="slider-btn">Shop Now!</a>
                </figcaption>
              </figure>
            </div>
            <div className="item">
              <figure>
                <img src="/assets/images/slider02.jpeg" alt="Sunglass" />
                <figcaption className="slider-text">
                  <h2>Sunglass</h2>
                  <h3>Stylish & Trendy</h3>
                  <a href="#" className="slider-btn">Shop Now!</a>
                </figcaption>
              </figure>
            </div>
            <div className="item">
              <figure>
                <img src="/assets/images/slider03.jpg" alt="Wardrobe" />
                <figcaption className="slider-text">
                  <h2>Wardrobe</h2>
                  <h3>Stylish & Trendy</h3>
                  <a href="#" className="slider-btn">Shop Now!</a>
                </figcaption>
              </figure>
            </div>
          </Slider>
        </div>
      </section>
  );
};

export default HeroSlider;