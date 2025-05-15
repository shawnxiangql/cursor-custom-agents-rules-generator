# 家庭物品管理系统 - API规格

本文档详细描述家庭物品管理系统的API接口规格，包括请求参数、响应格式和认证要求。

## 认证与授权

所有API（除了认证相关的API）都需要通过JWT令牌进行认证。令牌需要在请求头中通过`Authorization: Bearer {token}`方式提供。

## 用户管理API

### 用户注册
- **端点**: `POST /api/auth/register`
- **描述**: 注册新用户
- **请求体**:
```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "fullName": "string"
}
```
- **响应** (200 OK): 
```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "fullName": "string",
  "role": "string",
  "createdAt": "datetime"
}
```
- **错误响应** (400 Bad Request):
```json
{
  "error": "string",
  "message": "string"
}
```

### 用户登录
- **端点**: `POST /api/auth/login`
- **描述**: 用户登录并获取JWT令牌
- **请求体**:
```json
{
  "username": "string",
  "password": "string"
}
```
- **响应** (200 OK):
```json
{
  "token": "string",
  "user": {
    "id": "number",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "role": "string"
  }
}
```
- **错误响应** (401 Unauthorized):
```json
{
  "error": "string",
  "message": "string"
}
```

### 获取当前用户信息
- **端点**: `GET /api/users/me`
- **描述**: 获取当前登录用户的详细信息
- **请求头**: `Authorization: Bearer {token}`
- **响应** (200 OK):
```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "fullName": "string",
  "role": "string",
  "households": [
    {
      "id": "number",
      "name": "string",
      "role": "string"
    }
  ]
}
```
- **错误响应** (401 Unauthorized):
```json
{
  "error": "string",
  "message": "string"
}
```

### 更新用户信息
- **端点**: `PUT /api/users/me`
- **描述**: 更新当前用户的个人信息
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
```json
{
  "email": "string",
  "fullName": "string",
  "password": "string"
}
```
- **响应** (200 OK):
```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "fullName": "string",
  "role": "string",
  "updatedAt": "datetime"
}
```

## 家庭组管理API

### 创建家庭组
- **端点**: `POST /api/households`
- **描述**: 创建新的家庭组
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
```json
{
  "name": "string",
  "description": "string"
}
```
- **响应** (201 Created):
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "createdBy": {
    "id": "number",
    "username": "string"
  },
  "createdAt": "datetime"
}
```

### 获取家庭组列表
- **端点**: `GET /api/households`
- **描述**: 获取当前用户所属的所有家庭组
- **请求头**: `Authorization: Bearer {token}`
- **响应** (200 OK):
```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "role": "string",
    "memberCount": "number"
  }
]
```

### 获取家庭组详情
- **端点**: `GET /api/households/{id}`
- **描述**: 获取特定家庭组的详细信息
- **请求头**: `Authorization: Bearer {token}`
- **响应** (200 OK):
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "createdBy": {
    "id": "number",
    "username": "string"
  },
  "createdAt": "datetime",
  "members": [
    {
      "id": "number",
      "username": "string",
      "fullName": "string",
      "role": "string",
      "joinedAt": "datetime"
    }
  ]
}
```

### 添加家庭成员
- **端点**: `POST /api/households/{id}/members`
- **描述**: 向特定家庭组添加新成员
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
```json
{
  "username": "string",
  "role": "string"
}
```
- **响应** (201 Created):
```json
{
  "id": "number",
  "username": "string",
  "fullName": "string",
  "role": "string",
  "joinedAt": "datetime"
}
```

## 物品管理API

### 获取物品列表
- **端点**: `GET /api/items`
- **描述**: 获取满足条件的物品列表
- **请求头**: `Authorization: Bearer {token}`
- **查询参数**:
  - `householdId`: 家庭ID (必填)
  - `categoryId`: 分类ID (可选)
  - `locationId`: 位置ID (可选)
  - `status`: 状态 (可选)
  - `search`: 搜索关键词 (可选)
  - `page`: 页码，默认0
  - `size`: 每页条数，默认20
  - `sort`: 排序字段，默认"name,asc"
- **响应** (200 OK):
```json
{
  "content": [
    {
      "id": "number",
      "name": "string",
      "description": "string",
      "categoryId": "number",
      "categoryName": "string",
      "locationId": "number",
      "locationName": "string",
      "status": "string",
      "purchaseDate": "date",
      "purchasePrice": "number",
      "mainImageUrl": "string"
    }
  ],
  "totalElements": "number",
  "totalPages": "number",
  "size": "number",
  "number": "number"
}
```

### 获取物品详情
- **端点**: `GET /api/items/{id}`
- **描述**: 获取特定物品的详细信息
- **请求头**: `Authorization: Bearer {token}`
- **响应** (200 OK):
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "category": {
    "id": "number",
    "name": "string"
  },
  "location": {
    "id": "number",
    "name": "string",
    "fullPath": "string"
  },
  "status": "string",
  "purchaseInfo": {
    "date": "date",
    "price": "number",
    "store": "string",
    "warranty": {
      "period": "number",
      "expiryDate": "date"
    }
  },
  "images": [
    {
      "id": "number",
      "url": "string",
      "isPrimary": "boolean"
    }
  ],
  "tags": [
    {
      "id": "number",
      "name": "string"
    }
  ],
  "maintenanceRecords": [
    {
      "id": "number",
      "description": "string",
      "date": "date",
      "cost": "number"
    }
  ],
  "borrowHistory": [
    {
      "id": "number",
      "borrowedBy": "string",
      "borrowDate": "date",
      "returnDate": "date",
      "status": "string"
    }
  ],
  "createdBy": {
    "id": "number",
    "username": "string"
  },
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "householdId": "number"
}
```

### 创建物品
- **端点**: `POST /api/items`
- **描述**: 创建新物品
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
```json
{
  "name": "string",
  "description": "string",
  "categoryId": "number",
  "locationId": "number",
  "status": "string",
  "purchaseDate": "date",
  "purchasePrice": "number",
  "purchaseStore": "string",
  "warrantyPeriod": "number",
  "warrantyExpiryDate": "date",
  "tags": ["number"],
  "householdId": "number"
}
```
- **响应** (201 Created): 返回创建的物品详情，格式同获取物品详情

### 更新物品
- **端点**: `PUT /api/items/{id}`
- **描述**: 更新特定物品的信息
- **请求头**: `Authorization: Bearer {token}`
- **请求体**: 同创建物品
- **响应** (200 OK): 返回更新后的物品详情，格式同获取物品详情

### 删除物品
- **端点**: `DELETE /api/items/{id}`
- **描述**: 删除特定物品
- **请求头**: `Authorization: Bearer {token}`
- **响应** (200 OK): 
```json
{
  "success": true,
  "message": "物品已删除"
}
```

### 上传物品图片
- **端点**: `POST /api/items/{id}/images`
- **描述**: 为特定物品上传图片
- **请求头**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: multipart/form-data`
- **请求体**: FormData格式，文件字段名"file"
- **响应** (201 Created):
```json
{
  "id": "number",
  "url": "string",
  "fileName": "string",
  "fileSize": "number",
  "contentType": "string",
  "isPrimary": "boolean",
  "uploadDate": "datetime"
}
```

### 设置主图片
- **端点**: `PUT /api/items/{itemId}/images/{imageId}/primary`
- **描述**: 将特定图片设为物品的主图片
- **请求头**: `Authorization: Bearer {token}`
- **响应** (200 OK):
```json
{
  "success": true,
  "message": "已设置为主图片"
}
```

### 删除物品图片
- **端点**: `DELETE /api/items/{itemId}/images/{imageId}`
- **描述**: 删除特定物品的特定图片
- **请求头**: `Authorization: Bearer {token}`
- **响应** (200 OK):
```json
{
  "success": true,
  "message": "图片已删除"
}
```

## 分类管理API

### 获取分类列表
- **端点**: `GET /api/categories`
- **描述**: 获取特定家庭组的分类列表
- **请求头**: `Authorization: Bearer {token}`
- **查询参数**:
  - `householdId`: 家庭ID (必填)
- **响应** (200 OK):
```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "itemCount": "number"
  }
]
```

### 创建分类
- **端点**: `POST /api/categories`
- **描述**: 创建新分类
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
```json
{
  "name": "string",
  "description": "string",
  "householdId": "number"
}
```
- **响应** (201 Created):
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "householdId": "number",
  "createdAt": "datetime"
}
```

## 位置管理API

### 获取位置树
- **端点**: `GET /api/locations/tree`
- **描述**: 获取特定家庭组的位置树结构
- **请求头**: `Authorization: Bearer {token}`
- **查询参数**:
  - `householdId`: 家庭ID (必填)
- **响应** (200 OK):
```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "itemCount": "number",
    "children": [
      {
        "id": "number",
        "name": "string",
        "description": "string",
        "itemCount": "number",
        "children": []
      }
    ]
  }
]
```

### 创建位置
- **端点**: `POST /api/locations`
- **描述**: 创建新位置
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
```json
{
  "name": "string",
  "description": "string",
  "parentLocationId": "number",
  "householdId": "number"
}
```
- **响应** (201 Created):
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "parentLocationId": "number",
  "householdId": "number",
  "createdAt": "datetime"
}
```

## 标签管理API

### 获取标签列表
- **端点**: `GET /api/tags`
- **描述**: 获取特定家庭组的标签列表
- **请求头**: `Authorization: Bearer {token}`
- **查询参数**:
  - `householdId`: 家庭ID (必填)
- **响应** (200 OK):
```json
[
  {
    "id": "number",
    "name": "string",
    "itemCount": "number"
  }
]
```

### 创建标签
- **端点**: `POST /api/tags`
- **描述**: 创建新标签
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
```json
{
  "name": "string",
  "householdId": "number"
}
```
- **响应** (201 Created):
```json
{
  "id": "number",
  "name": "string",
  "householdId": "number",
  "createdAt": "datetime"
}
```

## 维护记录API

### 添加维护记录
- **端点**: `POST /api/items/{itemId}/maintenance`
- **描述**: 为特定物品添加维护记录
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
```json
{
  "description": "string",
  "maintenanceDate": "date",
  "cost": "number"
}
```
- **响应** (201 Created):
```json
{
  "id": "number",
  "description": "string",
  "maintenanceDate": "date",
  "cost": "number",
  "createdAt": "datetime"
}
```

## 借出记录API

### 添加借出记录
- **端点**: `POST /api/items/{itemId}/borrow`
- **描述**: 记录物品借出
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
```json
{
  "borrowedBy": "string",
  "borrowDate": "date",
  "expectedReturnDate": "date",
  "notes": "string"
}
```
- **响应** (201 Created):
```json
{
  "id": "number",
  "borrowedBy": "string",
  "borrowDate": "date",
  "expectedReturnDate": "date",
  "status": "string",
  "notes": "string",
  "createdAt": "datetime"
}
```

### 更新借出状态
- **端点**: `PUT /api/items/{itemId}/borrow/{borrowId}/return`
- **描述**: 更新借出记录为已归还
- **请求头**: `Authorization: Bearer {token}`
- **请求体**:
```json
{
  "returnDate": "date",
  "notes": "string"
}
```
- **响应** (200 OK):
```json
{
  "id": "number",
  "borrowedBy": "string",
  "borrowDate": "date",
  "expectedReturnDate": "date",
  "actualReturnDate": "date",
  "status": "string",
  "notes": "string",
  "updatedAt": "datetime"
}
```

## 提醒API

### 获取提醒列表
- **端点**: `GET /api/reminders`
- **描述**: 获取当前用户的提醒列表
- **请求头**: `Authorization: Bearer {token}`
- **查询参数**:
  - `type`: 提醒类型 (warranty|maintenance|borrow) (可选)
  - `householdId`: 家庭ID (可选)
  - `page`: 页码，默认0
  - `size`: 每页条数，默认20
- **响应** (200 OK):
```json
{
  "content": [
    {
      "id": "number",
      "type": "string",
      "title": "string",
      "description": "string",
      "dueDate": "date",
      "item": {
        "id": "number",
        "name": "string",
        "mainImageUrl": "string"
      },
      "status": "string"
    }
  ],
  "totalElements": "number",
  "totalPages": "number",
  "size": "number",
  "number": "number"
}
```

### 标记提醒为已处理
- **端点**: `PUT /api/reminders/{id}/acknowledge`
- **描述**: 标记特定提醒为已处理
- **请求头**: `Authorization: Bearer {token}`
- **响应** (200 OK):
```json
{
  "id": "number",
  "status": "string",
  "acknowledgedAt": "datetime"
}
```

## 错误处理

所有API在出错时将返回一致的错误格式：

```json
{
  "timestamp": "datetime",
  "status": "number",
  "error": "string",
  "message": "string",
  "path": "string"
}
```

常见HTTP状态码：
- 200 OK: 请求成功
- 201 Created: 资源创建成功
- 400 Bad Request: 请求参数有误
- 401 Unauthorized: 未认证或认证失败
- 403 Forbidden: 无权限访问资源
- 404 Not Found: 资源不存在
- 500 Internal Server Error: 服务器内部错误 