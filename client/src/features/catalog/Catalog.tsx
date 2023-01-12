import { useState, useEffect } from "react";
import { Product } from "../../model/product";
import ProductList from "./ProductList";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
        .then(response => response.json())
        .then(data => setProducts(data));
    }, []);
  
    return (
        <>
            <ProductList products={products}/>
        </>
    );
}