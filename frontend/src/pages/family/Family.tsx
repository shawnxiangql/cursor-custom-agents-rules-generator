import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  TextField,
  Avatar,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  GroupAdd as GroupAddIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { Grid } from '../../components/ui';

// 模拟数据
const familyMembers = [
  {
    id: '1',
    name: '张三',
    role: '家长',
    email: 'zhangsan@example.com',
    phone: '13800138001',
    avatar: '/avatar1.jpg',
    itemsCount: 45
  },
  {
    id: '2',
    name: '李四',
    role: '家长',
    email: 'lisi@example.com',
    phone: '13800138002',
    avatar: '/avatar2.jpg',
    itemsCount: 32
  },
  {
    id: '3',
    name: '王五',
    role: '子女',
    email: 'wangwu@example.com',
    phone: '13800138003',
    avatar: '/avatar3.jpg',
    itemsCount: 18
  },
  {
    id: '4',
    name: '赵六',
    role: '子女',
    email: 'zhaoliu@example.com',
    phone: '13800138004',
    avatar: '/avatar4.jpg',
    itemsCount: 15
  }
];

// 模拟家庭数据
const familyData = {
  name: '张氏家庭',
  createdAt: '2023-01-01',
  totalItems: 110,
  totalValue: 65800
};

// 模拟邀请数据
const pendingInvitations = [
  {
    id: '1',
    email: 'pending1@example.com',
    status: '等待接受',
    sentAt: '2023-05-10'
  },
  {
    id: '2',
    email: 'pending2@example.com',
    status: '等待接受',
    sentAt: '2023-05-12'
  }
];

const Family: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          家庭组
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
        >
          邀请成员
        </Button>
      </Box>
      
      {/* 家庭信息卡片 */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: theme.palette.primary.main,
                  mr: 2
                }}
              >
                {familyData.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {familyData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  创建于: {familyData.createdAt}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 4 }}>
              <Box sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {familyData.totalItems}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  物品总数
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  ¥{familyData.totalValue.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  总价值
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {familyMembers.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  成员数量
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* 成员列表 */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        家庭成员
      </Typography>
      
      <Grid container spacing={3}>
        {familyMembers.map((member) => (
          <Grid item xs={12} sm={6} md={3} key={member.id}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                }
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Avatar
                  src={member.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    border: `2px solid ${theme.palette.primary.main}`
                  }}
                />
                
                <Typography variant="h6">
                  {member.name}
                </Typography>
                
                <Chip 
                  label={member.role} 
                  size="small" 
                  color={member.role === '家长' ? 'primary' : 'secondary'} 
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <MailIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {member.email}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {member.phone}
                  </Typography>
                </Box>
                
                <Typography variant="body2">
                  拥有 <strong>{member.itemsCount}</strong> 件物品
                </Typography>
                
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        
        {/* 添加新成员卡片 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: `2px dashed ${theme.palette.grey[300]}`,
              bgcolor: theme.palette.background.default,
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: theme.palette.primary.main,
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: `${theme.palette.primary.main}20`,
                  color: theme.palette.primary.main,
                  margin: '0 auto',
                  mb: 2
                }}
              >
                <GroupAddIcon />
              </Avatar>
              <Typography variant="h6" color="primary">
                添加家庭成员
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                邀请新成员加入您的家庭组
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* 待处理邀请 */}
      {pendingInvitations.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            待处理邀请
          </Typography>
          
          <Paper>
            <List sx={{ width: '100%' }}>
              {pendingInvitations.map((invitation, index) => (
                <React.Fragment key={invitation.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: `${theme.palette.warning.main}20`, color: theme.palette.warning.main }}>
                        <MailIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={invitation.email}
                      secondary={`发送于: ${invitation.sentAt}`}
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label={invitation.status}
                        color="warning"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <IconButton edge="end" aria-label="删除邀请" color="error" size="small">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < pendingInvitations.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default Family; 