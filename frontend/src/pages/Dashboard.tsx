import React from 'react';
import { Container, Typography, Paper, Box, useTheme } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  CreditCard as CreditCardIcon,
  VerifiedUser as VerifiedUserIcon,
  Storage as StorageIcon
} from '@mui/icons-material';
import { Grid } from '../components/ui';

const Dashboard: React.FC = () => {
  const theme = useTheme();

  // 模拟数据
  const stats = [
    {
      title: '物品总数',
      value: '248',
      icon: <StorageIcon sx={{ fontSize: 40 }} color="primary" />,
      color: theme.palette.primary.main
    },
    {
      title: '总价值',
      value: '¥45,670',
      icon: <CreditCardIcon sx={{ fontSize: 40 }} color="secondary" />,
      color: theme.palette.secondary.main
    },
    {
      title: '本月新增',
      value: '24',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} color="success" />,
      color: theme.palette.success.main
    },
    {
      title: '家庭成员',
      value: '5',
      icon: <VerifiedUserIcon sx={{ fontSize: 40 }} color="info" />,
      color: theme.palette.info.main
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        仪表盘
      </Typography>
      
      <Grid container spacing={3}>
        {/* 统计卡片 */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  backgroundColor: stat.color,
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  {stat.title}
                </Typography>
                {stat.icon}
              </Box>
              <Typography variant="h4" component="div" fontWeight="bold">
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
        
        {/* 最近活动 */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }} elevation={2}>
            <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
              最近活动
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)', 
              borderRadius: 1,
              textAlign: 'center',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="body1" color="text.secondary">
                此处将显示最近物品活动记录
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* 分类分布 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }} elevation={2}>
            <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
              物品分类
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)', 
              borderRadius: 1,
              textAlign: 'center',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="body1" color="text.secondary">
                此处将显示物品分类统计图表
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* 贵重物品 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }} elevation={2}>
            <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
              贵重物品
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)', 
              borderRadius: 1,
              textAlign: 'center',
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="body1" color="text.secondary">
                此处将显示高价值物品列表
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 