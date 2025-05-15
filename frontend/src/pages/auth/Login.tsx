import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
  Alert,
  IconButton,
  InputAdornment,
  useTheme
} from '@mui/material';
import {
  Login as LoginIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

import { RootState } from '../../store';
import { loginRequest, loginSuccess, loginFailure } from '../../store/slices/authSlice';

const Login: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.email || !formData.password) {
      dispatch(loginFailure('请填写所有必填字段'));
      return;
    }
    
    // 开始登录
    dispatch(loginRequest());
    
    try {
      // 此处模拟API调用
      // 实际项目中应替换为真实API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟成功登录
      dispatch(loginSuccess({
        user: {
          id: '1',
          username: '测试用户',
          email: formData.email
        },
        token: 'mock-jwt-token'
      }));
      
      // 登录成功后跳转到首页
      navigate('/');
    } catch (error) {
      dispatch(loginFailure('登录失败，请检查用户名和密码'));
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          mb: 8
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            maxWidth: '450px'
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            登录
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="邮箱地址"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 3 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={<LoginIcon />}
              sx={{ mb: 2, py: 1.2 }}
            >
              {loading ? '登录中...' : '登录'}
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Link component={RouterLink} to="/forgot-password" variant="body2">
                忘记密码?
              </Link>
              <Link component={RouterLink} to="/register" variant="body2">
                没有账号? 注册
              </Link>
            </Box>
          </Box>
          
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              或使用
            </Typography>
          </Divider>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                py: 1,
                borderColor: theme.palette.grey[300],
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: theme.palette.grey[50],
                  borderColor: theme.palette.grey[400],
                }
              }}
            >
              其他登录方式
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 