import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  useTheme,
  SelectChangeEvent
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { Grid } from '../../components/ui';

// 模拟数据
const mockItems = [
  { id: '1', name: '索尼电视机', category: '电子产品', location: '客厅', price: 4999, purchaseDate: '2023-01-15' },
  { id: '2', name: '餐桌', category: '家具', location: '餐厅', price: 2999, purchaseDate: '2022-11-20' },
  { id: '3', name: '微波炉', category: '电器', location: '厨房', price: 899, purchaseDate: '2023-03-10' },
  { id: '4', name: '沙发', category: '家具', location: '客厅', price: 5999, purchaseDate: '2022-09-05' },
  { id: '5', name: '笔记本电脑', category: '电子产品', location: '书房', price: 6999, purchaseDate: '2023-02-18' },
  { id: '6', name: '空调', category: '电器', location: '卧室', price: 3499, purchaseDate: '2022-12-25' },
  { id: '7', name: '书架', category: '家具', location: '书房', price: 1299, purchaseDate: '2023-01-05' },
  { id: '8', name: '洗衣机', category: '电器', location: '阳台', price: 2399, purchaseDate: '2022-10-15' },
  { id: '9', name: '智能手表', category: '电子产品', location: '卧室', price: 1599, purchaseDate: '2023-04-02' },
  { id: '10', name: '床垫', category: '家具', location: '卧室', price: 3999, purchaseDate: '2022-08-20' },
  { id: '11', name: '咖啡机', category: '电器', location: '厨房', price: 799, purchaseDate: '2023-03-25' },
  { id: '12', name: '电饭煲', category: '电器', location: '厨房', price: 599, purchaseDate: '2023-01-30' }
];

// 筛选选项
const categories = ['电子产品', '家具', '电器', '书籍', '服装', '厨房用品'];
const locations = ['客厅', '卧室', '厨房', '书房', '餐厅', '阳台', '浴室'];

const ItemsSearch: React.FC = () => {
  const theme = useTheme();
  
  // 搜索状态
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // 筛选状态
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  
  // 表格状态
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // 处理搜索输入
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  // 处理筛选器变化
  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
  };
  
  const handleLocationChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedLocations(typeof value === 'string' ? value.split(',') : value);
  };
  
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };
  
  const handleFavoritesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnlyFavorites(event.target.checked);
  };
  
  // 处理表格分页
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // 重置所有筛选器
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setPriceRange([0, 10000]);
    setOnlyFavorites(false);
    setSearchQuery('');
  };
  
  // 筛选数据
  const filteredItems = mockItems.filter(item => {
    // 文本搜索
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 分类筛选
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(item.category);
    
    // 位置筛选
    const matchesLocation = selectedLocations.length === 0 || 
      selectedLocations.includes(item.location);
    
    // 价格范围筛选
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    
    // 综合所有筛选条件
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });
  
  // 分页数据
  const paginatedItems = filteredItems.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        物品搜索
      </Typography>
      
      {/* 搜索框 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <TextField
            fullWidth
            placeholder="搜索物品名称、类别或位置..."
            variant="outlined"
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
          
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(!showFilters)}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {showFilters ? '隐藏筛选' : '显示筛选'}
          </Button>
        </Box>
        
        {/* 筛选选项 */}
        {showFilters && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 3 }}>
              <Chip label="高级筛选" />
            </Divider>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-select-label">分类</InputLabel>
                  <Select
                    labelId="category-select-label"
                    multiple
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="location-select-label">位置</InputLabel>
                  <Select
                    labelId="location-select-label"
                    multiple
                    value={selectedLocations}
                    onChange={handleLocationChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {locations.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Typography gutterBottom>价格范围</Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10000}
                    step={100}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      ¥{priceRange[0]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ¥{priceRange[1]}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={onlyFavorites}
                        onChange={handleFavoritesChange}
                      />
                    }
                    label="仅显示收藏物品"
                  />
                  
                  <Button
                    variant="text"
                    startIcon={<CloseIcon />}
                    onClick={handleResetFilters}
                  >
                    重置筛选
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
      
      {/* 结果列表 */}
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>名称</TableCell>
                <TableCell>分类</TableCell>
                <TableCell>位置</TableCell>
                <TableCell align="right">价格</TableCell>
                <TableCell>购买日期</TableCell>
                <TableCell align="center">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    hover
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" fontWeight="medium">
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={item.category} 
                        size="small" 
                        variant="outlined" 
                        color="primary" 
                      />
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="bold" color="primary">
                        ¥{item.price.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.purchaseDate}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton size="small" color="info">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      未找到符合条件的物品
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="每页行数:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
        />
      </Paper>
    </Container>
  );
};

export default ItemsSearch; 