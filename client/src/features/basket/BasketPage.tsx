import { Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import LoadingComponent from "../../layout/LoadingComponent";
import { Basket } from "../../model/basket";

export default function BasketPage() {
    const [basket, setBasket] = useState<Basket | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('baskets')
            .then((response: AxiosResponse) => setBasket(response.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return <LoadingComponent />

    if (!basket)
        return <Typography variant="h3">Basket is empty</Typography>

    return (
        <h1>Buyer Id = {basket.buyerId}</h1>
    );
}