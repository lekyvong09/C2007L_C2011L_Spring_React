import React, { useEffect, useState } from 'react';
import './App.css';

const intialProducts = [
  {name: 'product 1', unitPrice: 11.11},
  {name: 'product 2', unitPrice: 22.22},
]

function App() {
  const [products, setProducts] = useState(intialProducts);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []);

  const addProduct = () => {
    setProducts((prevState) => [...prevState, 
      {name: 'product ' + (prevState.length + 1), unitPrice: 11.11* (prevState.length + 1)}]);
  }

  return (
    <div style={{color: 'blue',}}>
      <h1>My Shop</h1>
      <button onClick={addProduct}>Add Product</button>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - price: {product.unitPrice}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
