import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Alert from '@mui/material/Alert';
import { useProSidebar } from 'react-pro-sidebar';
import { DarkMode, LightMode } from "@mui/icons-material";
import { toggleActionTheme } from '../../redux/actions/themeAction';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';

// Styled components for customization
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    '& .MuiInputBase-input:focus': {
        borderRadius: '50px', // Adjust the shape of the search field when focused
    },
}));

const NotificationAlert = styled(Alert)(({ theme, color }) => ({
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    padding: '10px',
    fontWeight: 'bold',
    color: '#000', // Unique color for all alerts
    borderLeft: `5px solid ${color}`, // Border color on the left based on the specified color
}));

const HeaderTop = () => {
    const { collapseSidebar } = useProSidebar();
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const [showNotifications, setShowNotifications] = useState(false);

    // Function to toggle notification visibility
    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    };

    // Notification list (to be replaced with actual notification data)
    const notifications = [
        { message: "Pause déjeuner", color: "#f99999", icon: "🍔" },
        { message: "Absent", color: "#FF5893   ", icon: "❌" },
        { message: "Présent", color: "#66CC00", icon: "✅" },
        { message: "Retard", color: "#FFC300", icon: "⏰" },
        { message: "Pointage", color: "#5BC0DE", icon: "✔️" },
        // Add as many notifications as needed
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ boxShadow: 0, bgcolor: "#f0f0f2" }}>
                <Toolbar>
                    <IconButton sx={{ mr: 2, color: "#F72585" }} onClick={() => collapseSidebar()}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                         
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: "#3A0CA3", fontWeight: 600 }}
                    >
                        Digital Market
                    </Typography>

                    <IconButton sx={{ mr: 2, color: "#F72585" }} onClick={() => dispatch(toggleActionTheme())}>
                        {palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>

                    {/* Notification icon with click handling */}
                    <IconButton sx={{ color: "#F72585" }} onClick={handleNotificationClick}>
                        <NotificationsIcon />
                    </IconButton>

                    
                </Toolbar>
            </AppBar>
            {/* Display notifications as alerts if state is true */}
            {showNotifications && (
                <Box sx={{ position: 'fixed', top: '56px', right: 0, zIndex: 999 }}>
                    {/* Display notifications */}
                    {notifications.map((notification, index) => (
                        <NotificationAlert key={index} severity="info" color={notification.color} icon={notification.icon}>
                            {notification.message}
                        </NotificationAlert>
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default HeaderTop;
