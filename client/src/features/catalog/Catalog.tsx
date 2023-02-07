import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import LoadingComponent from "../../layout/LoadingComponent";
import { Product } from "../../model/product";
import ProductList from "./ProductList";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('products')
            .then((response: AxiosResponse) => setProducts(response.data))
            .finally(() => setLoading(false));
    }, []);
  
    if (loading)
        return <LoadingComponent />

    return (
        <>
            <ProductList products={products}/>
        </>
    );
}