import { AddCircle, Delete, RemoveCircle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BasketItem } from "../../model/basket";
import { store } from "../../store";
import { addBasketItemThunk, removeBasketItemThunk } from "./basketSlice";
import BasketSummary from "./BasketSummary";


export default function BasketPage() {
    const {basket, status} = useSelector((state: any) => state.basket);

    if (!basket)
        return <Typography variant="h3">Basket is empty</Typography>

    return (
    <>
        <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.basketItems.map((row: BasketItem) => (
                        <TableRow
                            key={row.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">${row.unitPrice}</TableCell>

                        <TableCell align="center">
                            <LoadingButton 
                                color="secondary"
                                loading={status === 'pendingAddItem' + row.productId}
                                onClick={() => store.dispatch(addBasketItemThunk({productId: row.productId}))}
                            >
                                <AddCircle />
                            </LoadingButton>
                                {row.quantity}
                            <LoadingButton 
                                color="error"
                                loading={status === 'pendingRemoveItem' + row.productId}
                                onClick={() => store.dispatch(removeBasketItemThunk({productId: row.productId, quantity: 1}))
                            }
                            >
                                <RemoveCircle />
                            </LoadingButton>
                        </TableCell>

                        <TableCell align="right">${(row.unitPrice * row.quantity).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton 
                                color="error"
                                loading={status === 'pendingRemoveItem' + row.productId}
                                onClick={() => store.dispatch(removeBasketItemThunk({productId: row.productId, quantity: row.quantity}))
                            }
                            >
                                <Delete />
                            </LoadingButton>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Grid container>
            <Grid item xs={6} />
            <Grid item xs={6} >
                <BasketSummary />
                <Button
                    component={Link}
                    to='/checkout'
                    variant="contained"
                    size="large"
                    fullWidth
                >
                    Checkout
                </Button>
            </Grid>
        </Grid>
    </>
    );
}