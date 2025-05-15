import apiClient from '../client';
import { AxiosResponse } from 'axios';

// 物品接口定义
export interface Item {
  id: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  location: {
    id: number;
    name: string;
  };
  price: number;
  purchaseDate: string;
  imageUrl: string | null;
}

// 分页响应接口
export interface PageResponse<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}

// 查询参数接口
export interface ItemQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  category?: number;
  location?: number;
}

// 创建物品请求接口
export interface CreateItemRequest {
  name: string;
  description: string;
  categoryId: number;
  locationId: number;
  price: number;
  purchaseDate: string;
  image?: File;
}

// 更新物品请求接口
export interface UpdateItemRequest {
  id: number;
  name?: string;
  description?: string;
  categoryId?: number;
  locationId?: number;
  price?: number;
  purchaseDate?: string;
  image?: File;
}

const itemService = {
  // 获取物品列表
  getItems: async (params: ItemQueryParams = {}): Promise<PageResponse<Item>> => {
    try {
      const response: AxiosResponse<PageResponse<Item>> = await apiClient.get('/items', { params });
      return response.data;
    } catch (error) {
      console.error('获取物品列表失败:', error);
      throw error;
    }
  },

  // 获取单个物品详情
  getItem: async (id: number): Promise<Item> => {
    try {
      const response: AxiosResponse<Item> = await apiClient.get(`/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`获取物品 ID: ${id} 详情失败:`, error);
      throw error;
    }
  },

  // 创建新物品
  createItem: async (item: CreateItemRequest): Promise<Item> => {
    try {
      // 如果有图片，使用FormData发送
      if (item.image) {
        const formData = new FormData();
        Object.entries(item).forEach(([key, value]) => {
          if (key === 'image' && value instanceof File) {
            formData.append('image', value);
          } else {
            formData.append(key, String(value));
          }
        });
        
        const response: AxiosResponse<Item> = await apiClient.post('/items', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } else {
        // 没有图片，直接发送JSON
        const response: AxiosResponse<Item> = await apiClient.post('/items', item);
        return response.data;
      }
    } catch (error) {
      console.error('创建物品失败:', error);
      throw error;
    }
  },

  // 更新物品
  updateItem: async (item: UpdateItemRequest): Promise<Item> => {
    try {
      // 如果有图片，使用FormData发送
      if (item.image) {
        const formData = new FormData();
        Object.entries(item).forEach(([key, value]) => {
          if (key === 'image' && value instanceof File) {
            formData.append('image', value);
          } else if (value !== undefined) {
            formData.append(key, String(value));
          }
        });
        
        const response: AxiosResponse<Item> = await apiClient.put(`/items/${item.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } else {
        // 没有图片，直接发送JSON
        const { id, ...updateData } = item;
        const response: AxiosResponse<Item> = await apiClient.put(`/items/${id}`, updateData);
        return response.data;
      }
    } catch (error) {
      console.error(`更新物品 ID: ${item.id} 失败:`, error);
      throw error;
    }
  },

  // 删除物品
  deleteItem: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/items/${id}`);
    } catch (error) {
      console.error(`删除物品 ID: ${id} 失败:`, error);
      throw error;
    }
  },

  // 获取物品分类列表
  getCategories: async (): Promise<{ id: number, name: string }[]> => {
    try {
      const response: AxiosResponse<{ id: number, name: string }[]> = await apiClient.get('/categories');
      return response.data;
    } catch (error) {
      console.error('获取物品分类列表失败:', error);
      throw error;
    }
  },

  // 获取物品位置列表
  getLocations: async (): Promise<{ id: number, name: string }[]> => {
    try {
      const response: AxiosResponse<{ id: number, name: string }[]> = await apiClient.get('/locations');
      return response.data;
    } catch (error) {
      console.error('获取物品位置列表失败:', error);
      throw error;
    }
  }
};

export default itemService; 