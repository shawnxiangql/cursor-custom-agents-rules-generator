import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import itemService, { Item, ItemQueryParams, PageResponse } from '../../api/services/itemService';

// 定义状态接口
interface ItemsState {
  items: Item[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
  filters: {
    search: string;
    category?: number;
    location?: number;
    sort: string;
  };
}

// 初始状态
const initialState: ItemsState = {
  items: [],
  status: 'idle',
  error: null,
  pagination: {
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  },
  filters: {
    search: '',
    sort: 'name,asc',
  },
};

// 异步Action: 获取物品列表
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (params: ItemQueryParams, { rejectWithValue }) => {
    try {
      return await itemService.getItems(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '获取物品列表失败');
    }
  }
);

// 异步Action: 删除物品
export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id: number, { rejectWithValue, dispatch, getState }) => {
    try {
      await itemService.deleteItem(id);
      
      // 删除成功后刷新列表
      const state = getState() as { items: ItemsState };
      dispatch(fetchItems({
        page: state.items.pagination.page,
        size: state.items.pagination.size,
        sort: state.items.filters.sort,
        search: state.items.filters.search,
        category: state.items.filters.category,
        location: state.items.filters.location,
      }));
      
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '删除物品失败');
    }
  }
);

// 创建Slice
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // 设置筛选条件
    setFilters: (state, action: PayloadAction<Partial<ItemsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      // 筛选条件变更时重置页码为0
      state.pagination.page = 0;
    },
    // 设置分页
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    // 设置每页条数
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.size = action.payload;
      // 改变每页条数时重置页码为0
      state.pagination.page = 0;
    },
  },
  extraReducers: (builder) => {
    // 处理获取物品列表
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<PageResponse<Item>>) => {
        state.status = 'succeeded';
        state.items = action.payload.content;
        state.pagination = {
          page: action.payload.number,
          size: action.payload.size,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
        };
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || '获取物品列表失败';
      })
      // 处理删除物品
      .addCase(deleteItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItem.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || '删除物品失败';
      });
  },
});

// 导出Action
export const { setFilters, setPage, setPageSize } = itemsSlice.actions;

// 导出Reducer
export default itemsSlice.reducer; 