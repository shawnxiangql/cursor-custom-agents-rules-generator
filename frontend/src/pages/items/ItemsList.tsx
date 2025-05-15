import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  IconButton,
  TextField,
  MenuItem,
  InputAdornment,
  Chip,
  Pagination,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import { Grid } from '../../components/ui';

// 模拟数据
const mockItems = [
  {
    id: '1',
    name: '索尼电视机',
    category: '电子产品',
    location: '客厅',
    price: 4999,
    purchaseDate: '2023-01-15',
    image: '/placeholder.jpg'
  },
  {
    id: '2',
    name: '餐桌',
    category: '家具',
    location: '餐厅',
    price: 2999,
    purchaseDate: '2022-11-20',
    image: '/placeholder.jpg'
  },
  {
    id: '3',
    name: '微波炉',
    category: '电器',
    location: '厨房',
    price: 899,
    purchaseDate: '2023-03-10',
    image: '/placeholder.jpg'
  },
  {
    id: '4',
    name: '沙发',
    category: '家具',
    location: '客厅',
    price: 5999,
    purchaseDate: '2022-09-05',
    image: '/placeholder.jpg'
  },
  {
    id: '5',
    name: '笔记本电脑',
    category: '电子产品',
    location: '书房',
    price: 6999,
    purchaseDate: '2023-02-18',
    image: '/placeholder.jpg'
  },
  {
    id: '6',
    name: '空调',
    category: '电器',
    location: '卧室',
    price: 3499,
    purchaseDate: '2022-12-25',
    image: '/placeholder.jpg'
  }
];

const sortOptions = [
  { value: 'name_asc', label: '名称 (A-Z)' },
  { value: 'name_desc', label: '名称 (Z-A)' },
  { value: 'price_asc', label: '价格 (低-高)' },
  { value: 'price_desc', label: '价格 (高-低)' },
  { value: 'date_asc', label: '购买日期 (早-晚)' },
  { value: 'date_desc', label: '购买日期 (晚-早)' }
];

const ItemsList: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name_asc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1); // 重置页码
  };
  
  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  // 过滤和排序物品
  let filteredItems = mockItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // 排序
  filteredItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'date_asc':
        return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime();
      case 'date_desc':
        return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
      default:
        return 0;
    }
  });
  
  // 分页
  const paginatedItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        物品列表
      </Typography>
      
      <Paper sx={{ p: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 2 }}>
          {/* 搜索框 */}
          <TextField
            label="搜索物品"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ maxWidth: { sm: '50%' } }}
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          {/* 排序下拉框 */}
          <TextField
            select
            label="排序方式"
            value={sortBy}
            onChange={handleSortChange}
            size="small"
            sx={{ minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SortIcon />
                </InputAdornment>
              ),
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          
          {/* 添加物品按钮 */}
          <Button variant="contained" sx={{ whiteSpace: 'nowrap' }}>
            添加物品
          </Button>
        </Box>
      </Paper>
      
      {/* 物品列表 */}
      {paginatedItems.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {paginatedItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.name}
                    sx={{ backgroundColor: 'grey.200' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" noWrap>
                      {item.name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Chip 
                        label={item.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                      <Typography variant="body2" color="text.secondary">
                        {item.location}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h6" 
                      color="primary" 
                      sx={{ mt: 2, fontWeight: 'bold' }}
                    >
                      ¥{item.price.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      购买于: {item.purchaseDate}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Button size="small" startIcon={<ViewIcon />}>
                      详情
                    </Button>
                    <Box>
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* 分页控件 */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              siblingCount={1} 
            />
          </Box>
        </>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            未找到符合条件的物品
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default ItemsList; 