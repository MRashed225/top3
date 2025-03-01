import React from 'react'
import Product from '../Product/Product';
import Slider from "react-slick";

export default function RelatedProducts({relatedProducts}) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
       
        
      };
  return (
    <Slider {...settings} className='p-5'>

{relatedProducts.map((product, index) => {
      return <div className="px-2"> <Product key={index} product={product} /></div>
    })}
    </Slider>

  
  )
}
