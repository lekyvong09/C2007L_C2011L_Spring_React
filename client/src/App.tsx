import React, { useState } from 'react';
import './App.css';

const intialProducts = [
  {name: 'product 1', price: 11.11},
  {name: 'product 2', price: 22.22},
]

function App() {
  const [products , setProducts] = useState(intialProducts);

  const addProduct = () => {
    setProducts((prevState) => [...products, 
      {name: 'product ' + (prevState.length + 1), price: 11.11* (prevState.length + 1)}]);
  }

  return (
    <div style={{color: 'blue',}}>
      <h1>My Shop</h1>
      <button onClick={addProduct}>Add Product</button>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - price: {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
