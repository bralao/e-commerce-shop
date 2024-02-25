import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/breadcrum/Breadcrum';
import ProductDisplay from '../components/productdisplay/ProductDisplay';
import DescriptionBox from '../components/descriptionbox/DescriptionBox';
import RelatedProducts from '../components/relatedproducts/RelatedProducts';

const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e) => e.id === Number(productId)); // explaning this line: we are using the find method to find the product with the id that matches the productId from the url. We are using the Number function to convert the productId to a number because the id in the all_product array is a number.

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox/>
      <RelatedProducts />
    </div>
  )
}

export default Product
