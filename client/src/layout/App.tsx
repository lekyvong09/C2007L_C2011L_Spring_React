import React, { useEffect, useState } from 'react';
import './App.css';
import { Product } from '../model/product';


function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []);

  const addProduct = () => {
    setProducts((prevState) => [...prevState, 
      {
        id: prevState.length + 1,
        name: 'product ' + (prevState.length + 1),
        description: 'desc product ' + (prevState.length + 1),
        unitPrice: 11.11* (prevState.length + 1),
        imageUrl: 'NONE',
        brand: 'NA',
        unitsInStock: 100,
        category: 'unknown'
      }
    ]);
    console.log(products);
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
