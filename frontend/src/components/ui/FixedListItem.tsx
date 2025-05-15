import React from 'react';
import { ListItem as MuiListItem, ListItemProps } from '@mui/material';

// 在Material-UI v5中，ListItem的button属性被移除，需要使用component="button"代替
interface FixedListItemProps extends Omit<ListItemProps, 'button'> {
  button?: boolean;
}

const ListItem: React.FC<FixedListItemProps> = ({ children, button, ...props }) => {
  return (
    <MuiListItem
      {...(button ? { component: 'button' as const } : {})}
      {...props}
    >
      {children}
    </MuiListItem>
  );
};

export default ListItem; 