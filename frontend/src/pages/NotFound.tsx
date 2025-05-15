import React from 'react';
import { Container, Typography, Button, Box, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        textAlign: 'center', 
        py: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)'
      }}
    >
      <Typography 
        variant="h1" 
        component="h1" 
        color={theme.palette.primary.main}
        sx={{ 
          fontSize: { xs: '5rem', md: '8rem' },
          fontWeight: 'bold', 
          mb: 2 
        }}
      >
        404
      </Typography>
      
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom
        sx={{ mb: 3 }}
      >
        页面未找到
      </Typography>
      
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ 
          mb: 5,
          maxWidth: '500px'
        }}
      >
        很抱歉，您要访问的页面不存在或已被移除。
        请检查您输入的URL是否正确，或返回首页继续浏览。
      </Typography>
      
      <Button 
        component={RouterLink} 
        to="/" 
        variant="contained" 
        size="large"
        startIcon={<HomeIcon />}
      >
        返回首页
      </Button>
      
      <Box 
        component="img"
        src="/404-illustration.svg"
        alt="404 页面未找到"
        sx={{
          display: 'block',
          mt: 6,
          maxWidth: '100%',
          height: 'auto',
          maxHeight: '300px',
          opacity: 0.8
        }}
      />
    </Container>
  );
};

export default NotFound; 