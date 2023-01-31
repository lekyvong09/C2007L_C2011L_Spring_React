import { AppBar, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props {
    darkMode: boolean,
    onSetDarkMode: (isDark: boolean) => void
}

export default function Header(props: Props) {
    const midLinks = [
        {title: 'catalog', path: '/catalog'},
        {title: 'about', path: '/about'},
        {title: 'contact', path: '/contact'},
        {title: 'upload', path: '/upload'},
    ];

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
                <List>
                    {midLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={{color: 'inherit'}}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
            </Toolbar>
        </AppBar>
    );
}