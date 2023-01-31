import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Product } from "../../model/product";

interface Props {
    product: Product;
}

export default function ProductCard(props: Props) {
    return (
        <>
            <Card>
                <CardHeader sx={{height: 72.03}}
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="category">
                            {props.product.category.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={props.product.name}
                    titleTypographyProps={{fontWeight: 'bold', color: 'primary.main'}}
                />
                <CardMedia
                    component="img"
                    sx={{ height: 380 }}
                    image={`http://localhost:8080/api/file/image/${props.product.imageUrl}`}
                    alt={`${props.product.name}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        ${props.product.unitPrice.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.product.brand}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Add to cart</Button>
                    <Button 
                        size="small"
                        component={Link}
                        to={`/catalog/${props.product.id}`}
                    >
                        View
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}