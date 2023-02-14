import { Delete } from "@mui/icons-material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";


export default function BasketPage() {
    const {basket} = useContext(StoreContext);

    if (!basket)
        return <Typography variant="h3">Basket is empty</Typography>

    return (
        <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
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
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">${(row.unitPrice * row.quantity).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <IconButton color="error">
                                <Delete />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}