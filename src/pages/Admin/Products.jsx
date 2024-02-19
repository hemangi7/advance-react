// // src/components/Products.js
// import React, { useEffect, useState } from 'react';
// import { firestore } from '../firebase';

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productsCollection = await firestore.collection('products').get();
//       const productsData = productsCollection.docs.map(doc => doc.data());
//       setProducts(productsData);
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h2>Products</h2>
//       <ul>
//         {products.map(product => (
//           <li key={product.id}>{product.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Products;
import React from 'react'

const Products = () => {
  return (
    <div>Products</div>
  )
}

export default Products
