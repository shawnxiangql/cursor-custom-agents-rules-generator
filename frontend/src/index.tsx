import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AppProvider from './components/AppProvider';

// 获取根元素
const container = document.getElementById('root');

// 为了解决TS严格模式下可能为null的警告
if (!container) {
  throw new Error('Root element not found');
}

// 移除加载指示器
const loadingElement = document.getElementById('root-loading');
if (loadingElement) {
  loadingElement.style.display = 'none';
}

// 创建根并渲染应用
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
); 