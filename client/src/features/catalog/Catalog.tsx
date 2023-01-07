import { Product } from "../../model/product";

interface Props {
    products: Product[],
    onAddProduct: () => void;
}

export default function Catalog(props: Props) {
    return (
        <>
            <button onClick={props.onAddProduct}>Add Product</button>
            <ul>
                {props.products.map((product: any, index: any) => (
                    <li key={index}>
                        {product.name} - price: {product.unitPrice}
                    </li>
                ))}
            </ul>
        </>
    );
}