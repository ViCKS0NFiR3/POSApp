import React from 'react';
import { useSelector } from 'react-redux';


function Product() {
  const product = useSelector(state => state.findProduct);
  return (
    <div>
        <h3>Product: {product.short_name} {product.price}</h3>
    </div>
  );
}

export default Product;
