import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

// 从本地存储中获取主题模式，如果没有则使用系统偏好
const getInitialThemeMode = (): ThemeMode => {
  const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
  
  if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
    return savedMode;
  }
  
  // 如果没有保存的主题，检查系统偏好
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

const initialState: ThemeState = {
  mode: getInitialThemeMode(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem('themeMode', action.payload);
    },
    toggleThemeMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.mode);
    },
  },
});

export const { setThemeMode, toggleThemeMode } = themeSlice.actions;

export default themeSlice.reducer; 