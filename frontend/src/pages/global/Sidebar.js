import React, { useEffect } from 'react';
import { Sidebar, Menu, MenuItem, menuClasses, useProSidebar } from 'react-pro-sidebar';
import { Box, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction, userProfileAction } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Correction ici
import NotificationsIcon from '@mui/icons-material/Notifications';
 
import logoDashboard from '../../img/avatar.svg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const SidebarAdm = () => {
    const { userInfo } = useSelector(state => state.signIn);
    const { palette } = useTheme();
    const { collapsed } = useProSidebar();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userProfileAction());
    }, []);

    // Log out 
    const logOut = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 500)
    }

    return (
        <Sidebar backgroundColor= "white" style={{ borderRightStyle: "none" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100%" }}>
                <Box sx={{ bgcolor: "#white", pb: 2 }}> {/* Couleur jolie pour la partie Head */}
                    <Box sx={{ pt: 3, pb: 5, display: "flex", justifyContent: "center" }}>
                        {collapsed ?
                            <Avatar alt="logo dashboard" src={logoDashboard} /> :
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <img style={{ width: "100px", height: "100px", textAlign: "center", transition: "all ease-out .5s", borderRadius: "50%" }} src={logoDashboard} alt="logo dashboard" />
                            </Box>
                        }
                    </Box>

                    <Menu
                        menuItemStyles={{
                            button: {
                                [`&.${menuClasses.button}`]: {
                                    color: "black",
                                    fontFamily: "Arial, sans-serif",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                },
                                [`&.${menuClasses.disabled}`]: {
                                    color: "#39999f",
                                },
                                '&:hover': {
                                    backgroundColor: "#white",
                                    color: "#39999f",
                                },
                            },
                            icon: {
                                [`&.${menuClasses.icon}`]: {
                                    color: "#39999f",
                                }
                            },
                        }}
                    >
                        {userInfo && userInfo.role === 1 ?
                            <>
                            <MenuItem component={<Link to="/user/info" />} icon={<AccountCircleIcon />}> Mon compte </MenuItem>
                          
                            <MenuItem component={<Link to="/admin/dashboard" />} icon={<DashboardIcon />}> Tableau du bord  </MenuItem>

                           <MenuItem component={<Link to="/admin/users" />} icon={<GroupAddIcon />}> Employés </MenuItem>
                          
                           <MenuItem component={<Link to="/admin/calendrier" />} icon={<CategoryIcon />}> Calendrier </MenuItem>

                       </> :
                       <>
                           <MenuItem component={<Link to="/user/info" />} icon={<AccountCircleIcon />}> Mon compte </MenuItem>
                           <MenuItem component={<Link to="/user/dashboard" />} icon={<WorkHistoryIcon />}> Fiche du pointage  </MenuItem>
                           <MenuItem component={<Link to="/user/notifications" />} icon={<NotificationsIcon />}> Notifications </MenuItem>
                           <MenuItem component={<Link to="/user/calendar" />} icon={<CalendarTodayIcon />}> Calendrier </MenuItem>
                       </>
                        }
                    </Menu>
                </Box>
                <Box sx={{ pb: 2 }}>
                    <Menu
                        menuItemStyles={{
                            button: {
                                [`&.${menuClasses.button}`]: {
                                    color: "black",
                                    fontFamily: "Arial, sans-serif",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                },
                                '&:hover': {
                                    backgroundColor: "#black",
                                    color: "black",
                                },
                            },
                            icon: {
                                [`&.${menuClasses.icon}`]: {
                                    color: "#39999f",
                                }
                            },
                        }}
                    >
                        <MenuItem onClick={logOut} icon={<LoginIcon />}>   Log out </MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Sidebar>
    )
}


{/* <MenuItem component={<Link to="/admin/jobs" />} icon={<WorkIcon />}> Jobs </MenuItem>
<MenuItem component={<Link to="/admin/category" />} icon={<CategoryIcon />}> Category </MenuItem> */}

export default SidebarAdm;





//jaw style 

{/* <>
<MenuItem style={{ display: 'inline-flex', alignItems: 'center' }}component={<Link to="/user/info" />} > <PersonIcon style={{ marginRight: '4px' }} /> Profil </MenuItem>
<MenuItem style={{ display: 'inline-flex', alignItems: 'center' }} component={<Link to="/admin/dashboard" />}> 
<DashboardIcon style={{ marginRight: '3px' }} /> Dashboard </MenuItem>

<MenuItem style={{ display: 'inline-flex', alignItems: 'center' }}  component={<Link to="/admin/users" />}>
    <GroupAddIcon style={{ marginRight: '3px' }}/> Users </MenuItem>

<MenuItem style={{ display: 'inline-flex', alignItems: 'center' }}  component={<Link to="/admin/calendrier" />}>
<CategoryIcon style={{ marginRight: '3px' }}/> calendrier </MenuItem  >

</> :
<>
<MenuItem style={{ display: 'inline-flex', alignItems: 'center' }}component={<Link to="/user/info" />} > <PersonIcon style={{ marginRight: '4px' }} /> Profil </MenuItem>
<MenuItem style={{ display: 'inline-flex', alignItems: 'center' }} component={<Link to="/user/dashboard" />} >
<WorkHistoryIcon  style={{ marginRight: '4px' }} /> Fiche du pointage  </MenuItem>


<MenuItem style={{ display: 'inline-flex', alignItems: 'center' }} component={<Link to="/user/notifications" />}>  <NotificationsIcon style={{ marginRight: '3px' }} />Notifications </MenuItem>
<MenuItem style={{ display: 'inline-flex', alignItems: 'center' }}  component={<Link to="/user/calendar" />}>  <CalendarTodayIcon style={{ marginRight: '3px' }}  /> Calendrier </MenuItem>
</> */}