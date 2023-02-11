import { Alert, AlertTitle, Button, ButtonGroup, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useState } from "react";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    return (
        <Container>
            <Typography>
                Testing error messages
            </Typography>
            <ButtonGroup fullWidth>
                <Button
                    variant="contained"
                    onClick={() => axios.post('buggy/validate-error', {
                        "name": "",
                        "email": "fewfew"
                    })
                        .then(response => console.log(response.data))
                        .catch(error => {
                            console.log(error);
                            setValidationErrors(error);
                        })
                    }
                >Test Validation Error</Button>
                <Button
                    variant="contained"
                    onClick={() => axios.get('buggy/404').then(response => console.log(response.data)).catch(error => console.log(error))}
                >Test 404 Error</Button>
                <Button
                    variant="contained"
                    onClick={() => axios.get('products/fewfew').then(response => console.log(response.data)).catch(error => console.log(error))}
                >Test 500 Error</Button>
            </ButtonGroup>

            {validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>
    );
}