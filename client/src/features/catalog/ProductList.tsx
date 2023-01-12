import { Grid } from "@mui/material";
import { Product } from "../../model/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList(props: Props) {
    return (
        <Grid container spacing={2}>
            {props.products.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <ProductCard key={product.id} product={product}/>
                </Grid>
            ))}
        </Grid>
    );
}