import React from 'react';
import HeroSlider from '../../components/Home/HeroSlider';
import Intro from '../../components/Home/Intro';
import DisplayProduct from '../../components/Home/DisplayProduct';

const HomepageScreen = () => {
    return (
        <div className="inner-one-content">
            <HeroSlider/>
            <Intro/>
            <DisplayProduct/>
        </div>
    );
};

export default HomepageScreen;
