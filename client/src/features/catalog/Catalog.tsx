import { Product } from "../../model/product";
import ProductList from "./ProductList";

interface Props {
    products: Product[],
    onAddProduct: () => void;
}

export default function Catalog(props: Props) {
    return (
        <>
            <button onClick={props.onAddProduct}>Add Product</button>
            <ProductList products={props.products}/>
        </>
    );
}