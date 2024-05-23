import './App.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import NotFound from './pages/NotFound';
import { CssBaseline, ThemeProvider } from '@mui/material';
//import { theme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import LogIn from './pages/LogIn';
import UserDashboard from './pages/user/UserDashboard';
import UserRoute from './component/UserRoute';
import AdminRoute from './component/AdminRoute';
import Layout from './pages/global/Layout';
import UserJobsHistory from './pages/user/UserJobsHistory';
import UserInfoDashboard from './pages/user/UserInfoDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import SingleJob from './pages/SingleJob';
import DashUsers from './pages/admin/DashUsers';
import DashJobs from './pages/admin/DashJobs';
import Register from './pages/Register';
import DashCategory from './pages/admin/DashCategory';
import DashCreateJob from './pages/admin/DashCreateJob';
import DashCreateCategory from './pages/admin/DashCreateCategory';
import InfoUser from './pages/admin/InfoUser.js'

import { createTheme } from '@mui/material/styles';
import { themeColors } from './theme'
import { useMemo } from 'react';
import MyCalendar from './pages/admin/Calendrier.js'
import event from "./Calendar/Event.js";
import Not from './Notification/Not.js';
import DashCreateUser from './pages/admin/CreateUser.js';
import UserUpdateDashboard from './pages/admin/UpdateUser.js';
 
import io from 'socket.io-client';
const socket = io('http://localhost:3000');
//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const DashCategoryHOC = Layout(DashCategory)
const DashCreateJobHOC = Layout(DashCreateJob)
const DashCreateCategoryHOC = Layout(DashCreateCategory)
const InfoUserHOC = Layout(InfoUser)
const DashCreateUserHOC = Layout(DashCreateUser)
const UserUpdateDashboardHOC = Layout(UserUpdateDashboard)

const MyCalendarHOC = Layout(MyCalendar)
const App = () => {
    const { mode } = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeColors(mode)), [mode]);
    const [message, setMessage] = useState('');
    const [notification, setNotification] = useState('');
    const [user, setUser] = useState(null);
    const userProfile = useSelector(state => state.userProfile);

    useEffect(() => {
        setUser(userProfile.user);
    }, [userProfile.user]);

    
       /*  // Écouter les messages du serveur
        socket.on('message', (data) => {
            setMessage(data);
        });
        socket.emit('notification', "test"); */
        // Écouter les messages du serveur
       socket.on('message', (data) => {
            setMessage(data);
        });
        socket.emit('notification', "test"); 

    return (
        <>
        
        
            <ToastContainer />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProSidebarProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<LogIn />}/>
                            <Route path='/search/location/:location' element={<Home />} />
                            <Route path='/search/:keyword' element={<Home />} />
                            <Route path='/login' element={<LogIn />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/job/:id' element={<SingleJob />} />
                            <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
                            <Route path='/admin/users' element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
                            <Route path='/admin/jobs' element={<AdminRoute><DashJobsHOC /></AdminRoute>} />
                            <Route path='/admin/category' element={<AdminRoute><DashCategoryHOC /></AdminRoute>} />
                            <Route path='/admin/job/create' element={<AdminRoute><DashCreateJobHOC /></AdminRoute>} />
                            <Route path='/admin/category/create' element={<AdminRoute><DashCreateCategoryHOC /></AdminRoute>} />
                            <Route path='/user/dashboard' element={<UserRoute>< UserDashboardHOC /></UserRoute>} />
                            <Route path='/user/jobs' element={<UserRoute>< UserJobsHistoryHOC /></UserRoute>} />
                            <Route path='/user/info' element={<UserRoute>< UserInfoDashboardHOC /></UserRoute>} />
                            <Route path='/user/notifications' element={<UserRoute><Not /></UserRoute>} />
                            <Route path='/employee/details/:id' element={<UserRoute>< InfoUserHOC/></UserRoute>} />
                            <Route path='/admin/user/create' element={<AdminRoute><DashCreateUserHOC /></AdminRoute>} />
                            <Route path='/admin/edit/user/:id' element={<AdminRoute><UserUpdateDashboardHOC /></AdminRoute>} />
                            <Route path='/admin/calendrier' element={<AdminRoute><MyCalendarHOC /></AdminRoute>} />

                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </ProSidebarProvider>
            </ThemeProvider>
        </>

    )
}

export default App
