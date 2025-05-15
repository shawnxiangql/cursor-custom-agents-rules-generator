import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
  useTheme,
  SelectChangeEvent
} from '@mui/material';
import {
  Person as PersonIcon,
  VpnKey as VpnKeyIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  CloudUpload as CloudUploadIcon,
  Save as SaveIcon
} from '@mui/icons-material';

import { RootState } from '../../store';
import { toggleThemeMode } from '../../store/slices/themeSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Settings: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [tabValue, setTabValue] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // 个人信息表单状态
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    firstName: '张',
    lastName: '三',
    phone: '13800138000',
    language: 'zh_CN'
  });
  
  // 通知设置状态
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    itemReminders: true,
    familyUpdates: true,
    marketingEmails: false
  });
  
  // 处理标签切换
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSuccessMessage(null);
  };
  
  // 处理个人信息表单变化
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  // 处理语言选择变化
  const handleLanguageChange = (e: SelectChangeEvent) => {
    setProfileData({
      ...profileData,
      language: e.target.value
    });
  };
  
  // 处理通知设置变化
  const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [event.target.name]: event.target.checked
    });
  };
  
  // 处理主题切换
  const handleThemeToggle = () => {
    dispatch(toggleThemeMode());
  };
  
  // 保存设置
  const handleSaveSettings = (settingType: string) => {
    // 在实际应用中应该发送API请求保存设置
    setSuccessMessage(`${settingType}设置已成功保存`);
    
    // 5秒后清除成功消息
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        设置
      </Typography>
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="设置标签"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<PersonIcon />} label="个人信息" iconPosition="start" />
            <Tab icon={<VpnKeyIcon />} label="安全设置" iconPosition="start" />
            <Tab icon={<NotificationsIcon />} label="通知设置" iconPosition="start" />
            <Tab icon={<PaletteIcon />} label="外观设置" iconPosition="start" />
          </Tabs>
        </Box>
        
        {/* 个人信息 */}
        <TabPanel value={tabValue} index={0}>
          <Box component="form" noValidate>
            <Typography variant="h6" gutterBottom>
              个人资料
            </Typography>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{ width: 80, height: 80, mr: 2 }}
                src="/avatar-placeholder.jpg"
              >
                {profileData.username.charAt(0).toUpperCase()}
              </Avatar>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                更改头像
                <input
                  type="file"
                  hidden
                  accept="image/*"
                />
              </Button>
            </Box>
            
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  label="姓"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                />
                <TextField
                  fullWidth
                  label="名"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                />
              </Box>
              
              <TextField
                fullWidth
                label="用户名"
                name="username"
                value={profileData.username}
                onChange={handleProfileChange}
              />
              
              <TextField
                fullWidth
                label="电子邮箱"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
              />
              
              <TextField
                fullWidth
                label="电话号码"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
              />
              
              <FormControl fullWidth>
                <InputLabel id="language-select-label">语言</InputLabel>
                <Select
                  labelId="language-select-label"
                  value={profileData.language}
                  label="语言"
                  onChange={handleLanguageChange}
                >
                  <MenuItem value="zh_CN">简体中文</MenuItem>
                  <MenuItem value="en_US">English (US)</MenuItem>
                  <MenuItem value="ja_JP">日本語</MenuItem>
                </Select>
              </FormControl>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSaveSettings('个人信息')}
                >
                  保存更改
                </Button>
              </Box>
            </Stack>
          </Box>
        </TabPanel>
        
        {/* 安全设置 */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            安全设置
          </Typography>
          
          <Stack spacing={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              更改密码
            </Typography>
            
            <TextField
              fullWidth
              label="当前密码"
              type="password"
              autoComplete="current-password"
            />
            
            <TextField
              fullWidth
              label="新密码"
              type="password"
              autoComplete="new-password"
            />
            
            <TextField
              fullWidth
              label="确认新密码"
              type="password"
              autoComplete="new-password"
            />
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              双因素认证
            </Typography>
            
            <FormControlLabel
              control={<Switch />}
              label="启用双因素认证"
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => handleSaveSettings('安全')}
              >
                保存更改
              </Button>
            </Box>
          </Stack>
        </TabPanel>
        
        {/* 通知设置 */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            通知设置
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText
                primary="电子邮件通知"
                secondary="接收有关账户活动的电子邮件通知"
              />
              <Switch
                edge="end"
                checked={notificationSettings.emailNotifications}
                onChange={handleNotificationChange}
                name="emailNotifications"
              />
            </ListItem>
            
            <Divider variant="inset" component="li" />
            
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText
                primary="物品提醒"
                secondary="接收有关物品维护和保养的提醒"
              />
              <Switch
                edge="end"
                checked={notificationSettings.itemReminders}
                onChange={handleNotificationChange}
                name="itemReminders"
              />
            </ListItem>
            
            <Divider variant="inset" component="li" />
            
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText
                primary="家庭组更新"
                secondary="有家庭成员加入或离开时接收通知"
              />
              <Switch
                edge="end"
                checked={notificationSettings.familyUpdates}
                onChange={handleNotificationChange}
                name="familyUpdates"
              />
            </ListItem>
            
            <Divider variant="inset" component="li" />
            
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText
                primary="营销邮件"
                secondary="接收有关新功能和促销的电子邮件"
              />
              <Switch
                edge="end"
                checked={notificationSettings.marketingEmails}
                onChange={handleNotificationChange}
                name="marketingEmails"
              />
            </ListItem>
          </List>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => handleSaveSettings('通知')}
            >
              保存更改
            </Button>
          </Box>
        </TabPanel>
        
        {/* 外观设置 */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            外观设置
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <PaletteIcon />
              </ListItemIcon>
              <ListItemText
                primary="深色模式"
                secondary="切换浅色/深色主题显示"
              />
              <Switch
                edge="end"
                checked={mode === 'dark'}
                onChange={handleThemeToggle}
              />
            </ListItem>
            
            <Divider variant="inset" component="li" />
            
            <ListItem>
              <ListItemIcon>
                <PaletteIcon />
              </ListItemIcon>
              <ListItemText
                primary="紧凑视图"
                secondary="减小元素间距，显示更多内容"
              />
              <Switch edge="end" />
            </ListItem>
          </List>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              主题色预览
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                mt: 2
              }}
            >
              {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map((color) => (
                <IconButton
                  key={color}
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: `${color}.main`,
                    '&:hover': {
                      bgcolor: `${color}.dark`,
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => handleSaveSettings('外观')}
            >
              保存更改
            </Button>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Settings; 