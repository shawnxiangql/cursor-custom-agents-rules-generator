import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  useTheme,
  Typography,
  Collapse
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Group as GroupIcon,
  Category as CategoryIcon,
  Search as SearchIcon,
  Description as ReportIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Home as HomeIcon
} from '@mui/icons-material';
import { RootState } from '../../store';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: 'permanent' | 'persistent' | 'temporary';
}

interface NavItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  requiresAuth?: boolean;
  children?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, variant }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null);
  
  const handleSubMenuToggle = (path: string) => {
    setOpenSubMenu(openSubMenu === path ? null : path);
  };

  const navItems: NavItem[] = [
    {
      text: '仪表盘',
      icon: <DashboardIcon />,
      path: '/',
      requiresAuth: false
    },
    {
      text: '物品管理',
      icon: <InventoryIcon />,
      path: '/items',
      requiresAuth: true,
      children: [
        {
          text: '所有物品',
          icon: <HomeIcon />,
          path: '/items/all',
        },
        {
          text: '分类浏览',
          icon: <CategoryIcon />,
          path: '/items/categories',
        },
        {
          text: '搜索',
          icon: <SearchIcon />,
          path: '/items/search',
        }
      ]
    },
    {
      text: '家庭组',
      icon: <GroupIcon />,
      path: '/family',
      requiresAuth: true
    },
    {
      text: '报表',
      icon: <ReportIcon />,
      path: '/reports',
      requiresAuth: true
    },
    {
      text: '设置',
      icon: <SettingsIcon />,
      path: '/settings',
      requiresAuth: true
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const drawerWidth = 240;

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: variant === 'temporary' ? theme.shadows[8] : 'none',
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Box sx={{ height: '64px' }} />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          导航菜单
        </Typography>
      </Box>
      <Divider />
      <List sx={{ p: 1 }}>
        {navItems.map((item) => {
          // 如果需要认证但未登录，则不显示
          if (item.requiresAuth && !isAuthenticated) {
            return null;
          }

          const isSelected = location.pathname === item.path || 
            (item.children && item.children.some(child => location.pathname === child.path));
          
          const hasChildren = item.children && item.children.length > 0;
          const isSubMenuOpen = openSubMenu === item.path;

          return (
            <React.Fragment key={item.path}>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={hasChildren ? () => handleSubMenuToggle(item.path) : () => handleNavigation(item.path)}
                  selected={isSelected}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: `${theme.palette.primary.main}20`,
                      '&:hover': {
                        backgroundColor: `${theme.palette.primary.main}30`,
                      },
                    },
                    '&:hover': {
                      backgroundColor: `${theme.palette.primary.main}10`,
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isSelected ? theme.palette.primary.main : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                  {hasChildren && (
                    isSubMenuOpen ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>
              
              {/* 子菜单 */}
              {hasChildren && item.children && (
                <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 4 }}>
                    {item.children.map((child) => {
                      const isChildSelected = location.pathname === child.path;
                      
                      return (
                        <ListItemButton
                          key={child.path}
                          onClick={() => handleNavigation(child.path)}
                          selected={isChildSelected}
                          sx={{
                            borderRadius: 1,
                            mb: 0.5,
                            '&.Mui-selected': {
                              backgroundColor: `${theme.palette.primary.main}20`,
                              '&:hover': {
                                backgroundColor: `${theme.palette.primary.main}30`,
                              },
                            },
                            '&:hover': {
                              backgroundColor: `${theme.palette.primary.main}10`,
                            },
                          }}
                        >
                          <ListItemIcon sx={{ color: isChildSelected ? theme.palette.primary.main : 'inherit' }}>
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText primary={child.text} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar; 