# 动态作品集网站

一个现代化的响应式作品集网站，展示个人作品和技能。

## 功能特性

- ✅ 响应式设计，支持各种设备尺寸
- ✅ 平滑滚动和动画效果
- ✅ 作品集筛选功能
- ✅ 技能进度条展示
- ✅ 联系表单
- ✅ 移动端友好导航
- ✅ 性能优化（懒加载等）

## 项目结构

```
动态作品集网站/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # JavaScript功能
└── README.md          # 项目说明
```

## 技术栈

- HTML5
- CSS3（Grid、Flexbox、动画）
- JavaScript（ES6+）
- Font Awesome 图标

## 快速开始

1. 克隆或下载项目文件
2. 用浏览器打开 `index.html` 文件
3. 或者使用本地服务器运行以获得最佳体验

### 使用本地服务器运行

```bash
# 使用 Python（如果已安装）
python -m http.server 8000

# 使用 Node.js http-server（如果已安装）
npx http-server

# 使用 PHP（如果已安装）
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

## 自定义说明

### 修改个人信息

1. **导航栏标题**：在 `index.html` 中修改 `.nav-logo a` 的内容
2. **个人信息**：在关于我部分更新文字内容
3. **联系信息**：在联系我部分更新邮箱、电话等信息
4. **技能数据**：在技能部分修改技能名称和百分比

### 添加作品

在 `index.html` 的作品集部分，按照现有结构添加新的 `.portfolio-item`：

```html
<div class="portfolio-item" data-category="web">
    <div class="portfolio-image">
        <img src="项目图片路径" alt="项目描述">
        <div class="portfolio-overlay">
            <h3>项目标题</h3>
            <p>项目描述</p>
            <button class="view-project">查看详情</button>
        </div>
    </div>
</div>
```

### 修改颜色主题

在 `style.css` 中修改以下CSS变量来改变主题颜色：

```css
/* 主要颜色 */
--primary-color: #3498db;
--secondary-color: #2c3e50;
--accent-color: #e74c3c;
```

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证

MIT License - 可自由使用和修改

## 更新日志

### v1.0.0 (2025-10-30)
- 初始版本发布
- 基础作品集功能
- 响应式设计实现
- 交互动画效果