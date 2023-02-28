import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../assets/animations/71390-shopping-cart-loader.json'


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };



export const EmtypCartAnimation = () => {
  return (
<div className="">
<Lottie 
    options={defaultOptions}
    height={200}
    width={200}
  />
  <p className='text-3xl font-medium text-center text-lighGray'>Empty Cart</p>
</div>
  )
}
