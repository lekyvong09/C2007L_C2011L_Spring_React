import { Button, Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <Container>
            <Typography gutterBottom variant="h3">not found</Typography>
            <Divider />
            <Button onClick={() => navigate(-1)}>Go back</Button>
        </Container>
    );
}