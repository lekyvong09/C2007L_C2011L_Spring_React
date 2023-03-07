import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../layout/LoadingComponent";
import { BasketItem } from "../../model/basket";
import { store } from "../../store";
import { addBasketItemThunk, removeBasketItemThunk } from "../basket/basketSlice";
import { fetchProductByIdThunk, productsAdapter } from "./catalogSlice";

export default function ProductDetail() {
    let params = useParams();
    const {basket, status} = useSelector((state: any) => state.basket);
    const productStatus = useSelector((state: any) => state.catalog.status);
    const product = productsAdapter.getSelectors().selectById(
        store.getState().catalog, +params.productId!);

    const basketItem = basket?.basketItems.find((i: BasketItem) => i.productId === product?.id);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (!product) {
            store.dispatch(fetchProductByIdThunk(+params.productId!));
        }
    }, [params.productId, product]);

    const handleInputChange = (event: any) => {
        if (event.target.value >= 0) {
            setQuantity(+event.target.value);
        }
    }

    const handleUpdateCart = () => {
        if (!basketItem || quantity > basketItem?.quantity) {
            const updatedQuantity = basketItem ? quantity - basketItem.quantity : quantity;
            store.dispatch(addBasketItemThunk({productId: product!.id, quantity: updatedQuantity}));
        } else {
            const updatedQuantity = basketItem.quantity - quantity;
            store.dispatch(removeBasketItemThunk({productId: product!.id, quantity: updatedQuantity}))
        }
    }

    if (productStatus.includes('pending'))
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
                            loading={status.includes('pending')}
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