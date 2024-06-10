import React from 'react';
import { Box } from '@mui/material';
import HeaderTop from './HeaderTop';
import SidebarAdm from './Sidebar';

const Layout = (Component) => (props) => {
    return (
        <>
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarAdm />
                <Box sx={{ flex: 1, bgcolor: '#f0f0f0' }}>
                    <HeaderTop />
                    <Box sx={{ p: 3 }}>
                        <Component {...props} />
                    </Box>
                </Box>
            </div>
        </>
    );
};

export default Layout;
