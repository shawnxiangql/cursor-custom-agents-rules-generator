# Epic-2 - Story-2

物品列表页API连接与数据展示

**As a** 用户
**I want** 在物品列表页查看我所有的物品信息
**so that** 我可以方便地管理和查找家中的各类物品

---

## Status

Draft

---

## Context

- 本故事为家庭物品管理系统的第二个前端开发故事，属于Epic-2（用户界面与体验）
- Story-1已经完成了前端项目的搭建与基础布局
- 现在需要将前端的物品列表页与后端API连接，实现真实数据的获取与展示
- 用户需要能够查看、筛选和排序物品列表
- 需要实现错误处理和加载状态管理

---

## Acceptance Criteria

- [ ] 物品列表页能够从后端API获取物品数据
- [ ] 列表页显示物品的基本信息（名称、类别、位置、价格等）
- [ ] 支持按名称、类别、位置等条件筛选物品
- [ ] 支持按不同字段（名称、价格、购买日期等）排序
- [ ] 实现分页功能，每页默认显示10条数据
- [ ] 列表项提供查看详情、编辑和删除的快捷操作
- [ ] 物品卡片展示物品图片（如有）
- [ ] 在数据加载过程中显示加载状态
- [ ] 处理API调用错误并向用户显示友好的错误提示
- [ ] 确保列表页在移动设备上有良好的展示效果

---

## Tasks

1. API服务层开发
   - [ ] 创建物品API服务接口
   - [ ] 实现获取物品列表的API调用
   - [ ] 添加查询参数处理（分页、排序、筛选）
   - [ ] 实现错误处理和请求重试机制
   
2. 状态管理整合
   - [ ] 创建物品列表Redux状态
   - [ ] 实现获取物品列表的异步Action
   - [ ] 添加加载状态和错误状态管理
   - [ ] 实现物品数据缓存策略

3. UI组件开发
   - [ ] 优化物品列表组件，支持真实数据展示
   - [ ] 实现筛选条件表单
   - [ ] 添加排序功能组件
   - [ ] 创建分页控件
   - [ ] 开发加载状态和错误提示组件
   
4. 交互功能实现
   - [ ] 实现筛选条件变更后的数据刷新
   - [ ] 添加排序功能
   - [ ] 实现分页导航
   - [ ] 添加物品卡片交互效果

5. 测试与优化
   - [ ] 编写单元测试
   - [ ] 确保响应式设计在各设备上正常工作
   - [ ] 性能优化，确保列表滚动流畅
   - [ ] 实现列表虚拟化以支持大量数据

---

## Constraints

- 物品列表API URL: `/api/items`
- 需支持以下查询参数:
  - `page`: 页码，从0开始
  - `size`: 每页条目数
  - `sort`: 排序字段和方向，如`name,asc`
  - `search`: 搜索关键词
  - `category`: 分类ID
  - `location`: 位置ID
- 确保遵循Material-UI最佳实践
- 所有组件必须支持浅色/深色模式切换

---

## API Schema

物品列表API返回的数据结构:

```json
{
  "content": [
    {
      "id": 1,
      "name": "索尼电视",
      "description": "55寸4K智能电视",
      "category": {
        "id": 1,
        "name": "电子产品"
      },
      "location": {
        "id": 1,
        "name": "客厅"
      },
      "price": 4999.00,
      "purchaseDate": "2023-01-15",
      "imageUrl": "/uploads/tv-image.jpg"
    },
    // 更多物品...
  ],
  "pageable": {
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "pageNumber": 0,
    "pageSize": 10,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "totalPages": 5,
  "totalElements": 48,
  "last": false,
  "first": true,
  "number": 0,
  "size": 10,
  "numberOfElements": 10,
  "sort": {
    "sorted": true,
    "unsorted": false,
    "empty": false
  },
  "empty": false
}
```

---

## Dev Notes

- 使用React Query或Redux Toolkit Query可简化数据获取和缓存
- 考虑实现乐观更新，提升用户体验
- 筛选和排序状态应保存在URL查询参数中，支持分享和回退
- 错误重试策略: 自动重试3次，间隔递增
- 使用防抖处理搜索输入，减少不必要的API调用

---

## Chat Command Log

- 用户：创建Epic-2的story-2
- Agent：已创建前端物品列表页API连接与数据展示功能的故事草稿 