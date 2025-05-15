import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

// 创建axios实例
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：添加认证令牌
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：处理错误和令牌过期
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { response } = error;
    
    // 处理401错误（未授权/令牌过期）
    if (response && response.status === 401) {
      store.dispatch(logout());
      window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    
    // 处理其他服务器错误
    const errorMessage = 
      (response && response.data && (response.data as any).message) ||
      '服务器错误，请稍后再试';
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient; 