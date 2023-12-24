import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import img1 from "../assets/tireonroad.jpg"
import img2 from "../assets/tires.jpg"
// import img3 from "../assets/_7edefaff-97f1-4c0b-8dd6-4167cf9e18cf.jpeg"
const Services = () => {
  return (
    <div>
        <Carousel
        infiniteLoop
        autoPlay
        showStatus={false}
        showThumbs={false}
        interval = {3000}
        >
            <div>
                <img src={img1} alt="Item1" />
                <p className='legend'>sample Text 1</p>
            </div>
            <div>
                <img src={img2} alt="Item2" />
                <p className='legend'>sample Text 2</p>
            </div>
        </Carousel>
    </div>
    
  )
}

export default Services