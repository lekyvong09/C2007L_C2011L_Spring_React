import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import LoadingComponent from "../../layout/LoadingComponent";
import { Product } from "../../model/product";

export default function ProductDetail() {
    let params = useParams();
    const {basket, setBasket, removeItem} = useContext(StoreContext);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const basketItem = basket?.basketItems.find(i => i.productId === product?.id);
    const [quantity, setQuantity] = useState(0);

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        axios.get(`products/${params.productId}`)
            .then(response => {
                console.log(response);
                setProduct(response.data);

                if (basketItem) {
                    setQuantity(basketItem.quantity);
                }

            }).catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [basketItem, params.productId]);

    const handleInputChange = (event: any) => {
        if (event.target.value >= 0) {
            setQuantity(+event.target.value);
        }
    }

    const handleUpdateCart = () => {
        setSubmitting(true);
        if (!basketItem || quantity > basketItem?.quantity) {
            const updatedQuantity = basketItem ? quantity - basketItem.quantity : quantity;
            axios.post(`baskets?productId=${product?.id}&quantity=${updatedQuantity}`, {})
                .then((response: AxiosResponse) => setBasket(response.data))
                .catch(err => console.log)
                .finally(() => setSubmitting(false));
        } else {
            const updatedQuantity = basketItem.quantity - quantity;
            axios.delete(`baskets?productId=${product?.id}&quantity=${updatedQuantity}`)
                .then(() => removeItem(product?.id!, updatedQuantity))
                .catch(err => console.log)
                .finally(() => setSubmitting(false));
        }
    }

    if (loading)
        return <LoadingComponent />

    if (!product)
        return <h3>Product not found</h3>

    return (
        <Grid container spacing={6}>
            <Grid item xs={4}>
                <img src={`${process.env.REACT_APP_BASE_URL}file/image/${product?.imageUrl}`}
                    alt={`${product?.name}`} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h3">{product?.name}</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant="h4" color='secondary' sx={{mb: 4}}>
                    ${product?.unitPrice.toFixed(2)}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product?.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product?.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>{product?.category}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Author</TableCell>
                                <TableCell>{product?.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product?.unitsInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant="outlined"
                            type="number"
                            label="Quantity in Cart"
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={basketItem?.quantity === quantity || (!basketItem && quantity === 0)}
                            loading={submitting}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {basketItem ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    );
}