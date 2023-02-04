import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { Product } from "../../model/product";
import ProductList from "./ProductList";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('products').then((response: AxiosResponse) => setProducts(response.data));
    }, []);
  
    return (
        <>
            <ProductList products={products}/>
        </>
    );
}