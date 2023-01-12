import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean,
    onSetDarkMode: (isDark: boolean) => void
}

export default function Header(props: Props) {
    const handleChange = (event: any) => {
        props.onSetDarkMode(event.target.checked);
    }

    return (
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar>
                <Typography variant="h6">My Shop</Typography>
                <Switch 
                    checked={props.darkMode}
                    onChange={handleChange}
                    inputProps={{'aria-label': 'controlled'}}
                />
            </Toolbar>
        </AppBar>
    );
}