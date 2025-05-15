import React from 'react';
import { Box, Container, Typography, Link, Divider, useTheme } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' 
          ? theme.palette.grey[100] 
          : theme.palette.grey[900],
      }}
    >
      <Divider sx={{ mb: 3 }} />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' } }}>
          <Box sx={{ mb: { xs: 2, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
              家庭物品管理系统
            </Typography>
            <Typography variant="body2" color="text.secondary">
              高效管理您的家庭物品，让生活井然有序
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 4 } }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                快速链接
              </Typography>
              <Box component="nav">
                <Link href="/" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>
                  首页
                </Link>
                <Link href="/items" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>
                  物品管理
                </Link>
                <Link href="/family" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>
                  家庭组
                </Link>
              </Box>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                帮助与支持
              </Typography>
              <Box component="nav">
                <Link href="/help" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>
                  使用指南
                </Link>
                <Link href="/faq" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>
                  常见问题
                </Link>
                <Link href="/contact" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>
                  联系我们
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            © {currentYear} 家庭物品管理系统. 保留所有权利.
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Link href="/privacy" color="inherit" underline="hover" variant="body2">
              隐私政策
            </Link>
            <Link href="/terms" color="inherit" underline="hover" variant="body2">
              使用条款
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 