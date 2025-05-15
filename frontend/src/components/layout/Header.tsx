import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Badge,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
  ListItemIcon
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon
} from '@mui/icons-material';

import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { toggleThemeMode } from '../../store/slices/themeSlice';
import { PaletteMode } from '@mui/material';

interface HeaderProps {
  onSidebarToggle: () => void;
  themeMode?: PaletteMode;
  onToggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle, themeMode, onToggleTheme }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { mode } = useSelector((state: RootState) => state.theme);
  
  // 使用props中的themeMode，如果未提供则使用Redux中的mode
  const currentThemeMode = themeMode || mode;
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationsOpen = Boolean(notificationsAnchorEl);
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };
  
  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/login');
  };
  
  const handleThemeToggle = () => {
    // 如果提供了onToggleTheme回调，则使用它，否则使用默认的Redux action
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      dispatch(toggleThemeMode());
    }
  };
  
  const handleSettings = () => {
    handleMenuClose();
    navigate('/settings');
  };
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onSidebarToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            alignItems: 'center',
            color: theme.palette.primary.main,
            fontWeight: 'bold'
          }}
        >
          家庭物品管理系统
        </Typography>
        
        {/* 主题切换按钮 */}
        <IconButton 
          color="inherit" 
          onClick={handleThemeToggle} 
          sx={{ ml: 1 }}
          aria-label={currentThemeMode === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
        >
          {currentThemeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        
        {isAuthenticated ? (
          <>
            {/* 通知图标 */}
            <IconButton
              color="inherit"
              onClick={handleNotificationsOpen}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            {/* 用户菜单 */}
            <Box sx={{ ml: 2 }}>
              <Tooltip title="打开设置">
                <IconButton
                  onClick={handleProfileMenuOpen}
                  size="small"
                  sx={{ p: 0 }}
                  aria-label="账户设置"
                >
                  <Avatar 
                    alt={user?.username} 
                    src="/avatar-placeholder.jpg"
                    sx={{ 
                      bgcolor: theme.palette.primary.main,
                      width: 32,
                      height: 32
                    }}
                  >
                    {user?.username?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </>
        ) : (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleLogin}
            startIcon={<PersonIcon />}
          >
            登录
          </Button>
        )}
      </Toolbar>
      
      {/* 用户菜单 */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1, minWidth: 180 }}>
          <Typography variant="subtitle1">
            {user?.username || '用户'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email || '未登录'}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          设置
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          退出登录
        </MenuItem>
      </Menu>
      
      {/* 通知菜单 */}
      <Menu
        anchorEl={notificationsAnchorEl}
        open={isNotificationsOpen}
        onClose={handleNotificationsClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: { minWidth: 320 }
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            通知
          </Typography>
        </Box>
        <Divider />
        <MenuItem>
          <Box sx={{ py: 1 }}>
            <Typography variant="body2" fontWeight="medium">
              系统通知：新版本已发布
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              物品管理系统版本1.2.0已发布，包含多项新功能和改进。
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              2分钟前
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Box sx={{ py: 1 }}>
            <Typography variant="body2" fontWeight="medium">
              家庭组更新：新成员加入
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              王五已接受您的邀请并加入了家庭组。
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              1小时前
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Box sx={{ py: 1 }}>
            <Typography variant="body2" fontWeight="medium">
              物品提醒：保修即将到期
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              您的笔记本电脑保修将在30天后到期。
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              昨天
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <Button size="small">查看所有通知</Button>
        </Box>
      </Menu>
    </AppBar>
  );
};

export default Header; 