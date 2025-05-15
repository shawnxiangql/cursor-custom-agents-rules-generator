import React, { useState, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { RootState } from '../../store';
import { toggleThemeMode } from '../../store/slices/themeSlice';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleToggleTheme = () => {
    dispatch(toggleThemeMode());
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header 
        onSidebarToggle={handleToggleDrawer}
        themeMode={theme.palette.mode}
        onToggleTheme={handleToggleTheme}
      />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar 
          open={drawerOpen}
          onClose={() => isMobile && setDrawerOpen(false)}
          variant={isMobile ? 'temporary' : 'persistent'}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerOpen ? 240 : 0}px)` },
            ml: { sm: drawerOpen ? '240px' : 0 },
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Box sx={{ mt: 8, mb: 4 }}>{children}</Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 