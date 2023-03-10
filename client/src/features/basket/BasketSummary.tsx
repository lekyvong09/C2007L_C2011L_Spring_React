import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { BasketItem } from "../../model/basket";

export default function BasketSummary() {
    // const {basket} = useContext(StoreContext);
    const {basket} = useSelector((state: any) => state.basket);

    const subtotal = basket ? basket.basketItems.reduce((sum: number, item: BasketItem) => sum + (item.quantity * item.unitPrice), 0): 0;

    const deliveryFee = subtotal > 100 ? 0 : 5;

    return (
        <TableContainer component={Paper} variant='outlined'>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell>${subtotal.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Delivery Fee</TableCell>
                        <TableCell>${deliveryFee.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell>${(subtotal + deliveryFee).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <span style={{fontStyle: 'italic'}}>
                                *Orders over $100 will be qualified for free delivery
                            </span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </TableContainer>
    );
}