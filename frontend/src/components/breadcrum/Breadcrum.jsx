import React from 'react'
import '../../styles/Breadcrum.css';
import arrow_icon from '../assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
  const {product} = props; //we are destructuring the product from the props object. This is the product that we are going to display in the breadcrum. We are going to use this product to display the breadcrum in the product page.

  return (
    <div className="breadcrum">
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}

    </div>
  )
}

export default Breadcrum
