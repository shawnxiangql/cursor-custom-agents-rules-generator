import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Tabs, 
  Tab, 
  Divider,
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  useTheme
} from '@mui/material';
import {
  Category as CategoryIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { ListItem } from '../../components/ui';

// 模拟分类数据
const categories = [
  { id: '1', name: '电子产品', count: 15, color: '#1976d2' },
  { id: '2', name: '家具', count: 8, color: '#2e7d32' },
  { id: '3', name: '厨房用品', count: 12, color: '#ed6c02' },
  { id: '4', name: '书籍', count: 20, color: '#9c27b0' },
  { id: '5', name: '服装', count: 25, color: '#d32f2f' },
  { id: '6', name: '运动器材', count: 5, color: '#0288d1' }
];

// 模拟物品数据
const categoryItems = {
  '1': [
    { id: '101', name: '笔记本电脑', location: '书房', price: 6999 },
    { id: '102', name: '智能手机', location: '卧室', price: 3999 },
    { id: '103', name: '平板电脑', location: '客厅', price: 2999 },
    { id: '104', name: '智能手表', location: '卧室', price: 1299 },
    { id: '105', name: '游戏机', location: '客厅', price: 2799 }
  ],
  '2': [
    { id: '201', name: '沙发', location: '客厅', price: 5999 },
    { id: '202', name: '餐桌', location: '餐厅', price: 2999 },
    { id: '203', name: '书柜', location: '书房', price: 1599 }
  ],
  '3': [
    { id: '301', name: '电饭煲', location: '厨房', price: 599 },
    { id: '302', name: '微波炉', location: '厨房', price: 899 },
    { id: '303', name: '刀具套装', location: '厨房', price: 399 }
  ],
  '4': [
    { id: '401', name: '小说集', location: '书房', price: 199 },
    { id: '402', name: '编程书籍', location: '书房', price: 299 },
    { id: '403', name: '烹饪书', location: '书房', price: 159 }
  ],
  '5': [
    { id: '501', name: '冬季外套', location: '卧室', price: 799 },
    { id: '502', name: '夏季T恤', location: '卧室', price: 199 },
    { id: '503', name: '运动鞋', location: '鞋柜', price: 599 }
  ],
  '6': [
    { id: '601', name: '跑步机', location: '健身房', price: 3999 },
    { id: '602', name: '哑铃套装', location: '健身房', price: 799 },
    { id: '603', name: '瑜伽垫', location: '健身房', price: 199 }
  ]
};

const ItemsCategories: React.FC = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  
  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        物品分类
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* 分类列表 */}
        <Paper sx={{ width: { xs: '100%', md: 300 }, height: 'fit-content' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={selectedCategory}
            onChange={handleCategoryChange}
            sx={{
              '.MuiTabs-indicator': {
                left: 0,
                right: 'auto',
                width: 4,
                borderRadius: '0 4px 4px 0'
              }
            }}
          >
            {categories.map(category => (
              <Tab
                key={category.id}
                value={category.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', textAlign: 'left' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          mr: 1, 
                          bgcolor: category.color,
                          color: '#fff'
                        }}
                      >
                        <CategoryIcon fontSize="small" />
                      </Avatar>
                      <Typography component="span">
                        {category.name}
                      </Typography>
                    </Box>
                    <Chip 
                      label={category.count} 
                      size="small" 
                      sx={{ 
                        ml: 1,
                        bgcolor: category.id === selectedCategory 
                          ? `${category.color}20` 
                          : theme.palette.grey[100],
                        color: category.id === selectedCategory 
                          ? category.color 
                          : theme.palette.text.secondary,
                        fontWeight: 'bold'
                      }} 
                    />
                  </Box>
                }
                sx={{
                  minHeight: 72,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  pl: 2,
                  pr: 1,
                  py: 1,
                  '&.Mui-selected': {
                    bgcolor: `${theme.palette.primary.main}10`,
                  }
                }}
              />
            ))}
          </Tabs>
        </Paper>
        
        {/* 分类物品列表 */}
        <Paper sx={{ flexGrow: 1, minHeight: 400 }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: categories.find(cat => cat.id === selectedCategory)?.color,
                  width: 40,
                  height: 40,
                  mr: 2
                }}
              >
                <CategoryIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">
                  {categories.find(cat => cat.id === selectedCategory)?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  共 {categories.find(cat => cat.id === selectedCategory)?.count} 件物品
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Divider />
          
          <List sx={{ p: 0 }}>
            {categoryItems[selectedCategory as keyof typeof categoryItems].map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar 
                      variant="rounded"
                      sx={{ 
                        bgcolor: `${categories.find(cat => cat.id === selectedCategory)?.color}30`,
                        color: categories.find(cat => cat.id === selectedCategory)?.color
                      }}
                    >
                      <CheckCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={item.name} 
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                          {item.location}
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                          ¥{item.price.toLocaleString()}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="查看详情">
                      <ArrowForwardIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < categoryItems[selectedCategory as keyof typeof categoryItems].length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default ItemsCategories; 