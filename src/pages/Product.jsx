import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../components/Breadcrums/Breadcrum'
import Productdisplay from '../components/ProductDisplay/Productdisplay'
import Descriptionbox from '../components/DescriptionBox/Descriptionbox'
import Relatedproducts from '../components/RelatedProducts/Relatedproducts'

const Product = () => {
  const { all_products } = useContext(ShopContext)
  const { productId } = useParams();
  const product = all_products.find((e) => e.id === Number(productId));


  return (
    <div>
      <Breadcrum product={product}/>
      <Productdisplay product={product}/>
      <Descriptionbox/>
      <Relatedproducts/>
    </div>
  )
}

export default Product
