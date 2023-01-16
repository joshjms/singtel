import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/system";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'


const drawerWidth = 240;

function AppLayout({ children }) {
    const [time, setTime] = React.useState(new Date());

    React.useEffect(()=>{
        import('bootstrap/dist/js/bootstrap.min.js');

        const timeUpdater = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timeUpdater);
      },[]);

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [active, setActive] = React.useState(0); //which menu is currently selected

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuList = [
        {id: 0, name: "Overview", icon: "", url: ""},
        {id: 1, name: "Inventory", icon: "shipping.png", url: ""},
        {id: 2, name: "Data", icon:"database.png", url: ""}
    ];


    const drawer = (
        <div 
        className="border border-0 side-nav d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" 
        >
            <div className="d-flex align-items-start justify-content-center nav-logo">
            <img src="singtel-logo.png" width="125px"/>
            </div>
            <ul className="nav nav-pills flex-column mb-auto">
            {menuList.map((menu, index) => (
                <li className="nav-item mb-2" key={index}>
                <a 
                    href={menu.url} 
                    className= {`d-flex align-items-center nav-link ${menu.id==active ? 'sidebar-active' : ''}`} 
                    aria-current="page"
                    style={{
                        boxShadow: "0px 3px 5px 1px rgba(0,0,0,0.2)"
                    }} 
                >
                    <div className="me-3 ms-4 mt-1 mb-1">
                    <img className="menu-logo" src={menu.icon} style={{width:"20px"}}/>
                    </div>
                    <div className="text-white fw-bold">
                    {menu.name}
                    </div>
                </a>
                </li>
            ))}
            </ul>
            
        </div>
    );
    
    const header_theme = createTheme({
        typography: {
            font: 'Kamerik',
        }
    });

    var date = `${new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(time)}, ${time.getDate()} ${new Intl.DateTimeFormat("en-US", { month: "long" }).format(time)} ${time.getFullYear()}`
    var clock = `${time.getHours()%24}:${time.getMinutes()}`

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar
                    sx={{
                        backgroundColor: "#32353E",
                        boxShadow: "0px 0px 0px"
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div 
                        className="header container text-center d-none d-sm-block"
                    >
                        <div className="row align-items-start">
                            <div 
                                className="col justify-content-start align-items-center"
                                style={{
                                    height:"100%",
                                }}
                            >
                                    {menuList[active].name}

                            </div>

                            <div 
                                className="col justify-content-center d-flex flex-column time"
                            >
                                <div className="d-flex justify-content-center">{date}</div>
                                <div className="d-flex justify-content-center">{clock}</div>
                            </div>

                            <div 
                                className="col justify-content-end d-flex">
                                orz joshua jamez
                            </div>
                        </div>
                    </div>
                    
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, 
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    backgroundColor: "#32353E",
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                { children }
            </Box>
        </Box>
    );
}

export default AppLayout
