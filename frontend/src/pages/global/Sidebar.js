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
 import logoDashboard from '../../img/bleu.jpg';
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
        <Sidebar backgroundColor= "#f0f0f2" style={{ borderRightStyle: "none" }}>
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
                                    color: "#3A0CA3",
                                    fontFamily: "Arial, sans-serif",
                                    fontSize: "15px",
                                     
                                },
                                [`&.${menuClasses.disabled}`]: {
                                    color: "#39999f",
                                },
                                '&:hover': {
                                    backgroundColor: "#white",
                                    color: "#F72585",
                                },
                            },
                            icon: {
                                [`&.${menuClasses.icon}`]: {
                                    color: "  #F72585",
                                }
                            },
                        }}
                    >






                        
                        {userInfo && userInfo.role === 1 ?
                            <>
                           <MenuItem style={{ display: 'inline-flex', alignItems: 'center' }}component={<Link to="/user/info" />} > <PersonIcon style={{ marginRight: '32px' }} /> Compte </MenuItem>
<MenuItem style={{ display: 'inline-flex', alignItems: 'center' ,color:"#F72585"}} component={<Link to="/admin/dashboard" />}> 
<DashboardIcon style={{ marginRight: '31px' }} /> Dashboard </MenuItem>

<MenuItem style={{ display: 'inline-flex', alignItems: 'center' }}  component={<Link to="/admin/users" />}>
    <GroupAddIcon style={{ marginRight: '31px' }}/> Employés </MenuItem>
                          
                 
<MenuItem style={{ display: 'inline-flex', alignItems: 'center' }}  component={<Link to="/admin/calendrier" />}>
<CategoryIcon style={{ marginRight: '31px' }}/> Calendrier </MenuItem  >

                       </> :
                       <>
                          <MenuItem style={{ display: 'inline-flex', alignItems: 'center' }}component={<Link to="/user/info" />} > <PersonIcon style={{ marginRight: '4px' }} /> Compte </MenuItem>
                          <MenuItem style={{ display: 'inline-flex', alignItems: 'center' }} component={<Link to="/user/dashboard" />} >
<WorkHistoryIcon  style={{ marginRight: '31px' }} /> Fiche du pointage  </MenuItem>
<MenuItem style={{ display: 'inline-flex', alignItems: 'center' }} component={<Link to="/user/notifications" />}>  <NotificationsIcon style={{ marginRight: '3px' }} />Notifications </MenuItem>
<MenuItem style={{ display: 'inline-flex', alignItems: 'center' }}  component={<Link to="/user/calendar" />}>  <CalendarTodayIcon style={{ marginRight: '3px' }}  /> Calendrier </MenuItem>
                       </>
                        }
                    </Menu>
                </Box>
                <Box sx={{ pb: 30}}>
                    <Menu
                        menuItemStyles={{
                            button: {
                                [`&.${menuClasses.button}`]: {
                                    color: "#3A0CA3",
                                    fontFamily: "Arial, sans-serif",
                                    fontSize: "15px",
                                    
                                },
                                '&:hover': {
                                    backgroundColor: "#black",
                                    color: "#F72585",
                                },
                            },
                            icon: {
                                [`&.${menuClasses.icon}`]: {
                                    color: "#3A0CA3",
                                }
                            },
                        }}
                    >
            <MenuItem onClick={logOut} icon={<LoginIcon sx={{ marginRight: '10px' }} />} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <span style={{ marginRight: '79px' }}> Au revoir </span>
</MenuItem>


    


                    </Menu>
                </Box>
            </Box>
        </Sidebar>
    )
}

 


export default SidebarAdm;



{/* <MenuItem component={<Link to="/admin/jobs" />} icon={<WorkIcon />}> Jobs </MenuItem>
<MenuItem component={<Link to="/admin/category" />} icon={<CategoryIcon />}> Category </MenuItem> */}

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



// reponsive

{/* <>
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
</> */}