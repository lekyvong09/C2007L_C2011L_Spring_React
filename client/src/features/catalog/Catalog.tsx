import { useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingComponent from "../../layout/LoadingComponent";
import { store } from "../../store";
import { fetchProductThunk, productsAdapter } from "./catalogSlice";
import ProductList from "./ProductList";


export default function Catalog() {
    //  const [products, setProducts] = useState<Product[]>([]);
    const products = productsAdapter.getSelectors().selectAll(store.getState().catalog);
    const {status, productLoaded} = useSelector((state: any) => state.catalog);

    useEffect(() => {
        if (!productLoaded) {
            store.dispatch(fetchProductThunk());
            console.log('run dispatch');
        }
    }, [productLoaded]);

    if (status.includes('pending'))
        return <LoadingComponent />

    return (
        <>
            <ProductList products={products}/>
        </>
    );
}