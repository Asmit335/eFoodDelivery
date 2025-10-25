import React from 'react'
import ProductSingle from './components/ProductSingle'
import Review from './components/Review'
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const {id}=useParams()
    
  return (
    <>
    <ProductSingle id={id}/>
    <Review/>
    </>
  )
}

export default ProductDetails