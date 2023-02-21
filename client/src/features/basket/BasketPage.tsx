import { AddCircle, Delete, RemoveCircle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";


export default function BasketPage() {
    const {basket, setBasket, removeItem} = useContext(StoreContext);
    const [loading, setLoading] = useState(false);

    const handleAddItem = (productId: number) => {
        setLoading(true);
        axios.post(`baskets?productId=${productId}&quantity=1`, {})
            .then((response: AxiosResponse) => setBasket(response.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    const handleRemoveItem = (productId: number, quantity: number) => {
        setLoading(true);
        axios.delete(`baskets?productId=${productId}&quantity=${quantity}`)
            .then(() => removeItem(productId, quantity))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    if (!basket)
        return <Typography variant="h3">Basket is empty</Typography>

    return (
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
                    {basket.basketItems.map((row) => (
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
                                loading={loading}
                                onClick={() => handleAddItem(row.productId)}
                            >
                                <AddCircle />
                            </LoadingButton>
                                {row.quantity}
                            <LoadingButton 
                                color="error"
                                loading={loading}
                                onClick={() => handleRemoveItem(row.productId, 1)}
                            >
                                <RemoveCircle />
                            </LoadingButton>
                        </TableCell>

                        <TableCell align="right">${(row.unitPrice * row.quantity).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton 
                                color="error"
                                onClick={() => handleRemoveItem(row.productId, row.quantity)}
                            >
                                <Delete />
                            </LoadingButton>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}