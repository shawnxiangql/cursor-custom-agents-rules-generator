import React from 'react';
import { Grid as MuiGrid, GridProps } from '@mui/material';

// 使用Material-UI v5时，Grid组件的item和container属性变为布尔值
// 这个组件用于处理v5中的Grid API变更
interface FixedGridProps extends Omit<GridProps, 'item' | 'container'> {
  item?: boolean;
  container?: boolean;
  xs?: number | boolean | 'auto';
  sm?: number | boolean | 'auto';
  md?: number | boolean | 'auto';
  lg?: number | boolean | 'auto';
  xl?: number | boolean | 'auto';
}

const Grid: React.FC<FixedGridProps> = ({ children, item, container, ...props }) => {
  return (
    <MuiGrid 
      {...(item ? { item: true } : {})}
      {...(container ? { container: true } : {})}
      {...props}
    >
      {children}
    </MuiGrid>
  );
};

export default Grid; 