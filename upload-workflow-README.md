# 🖼️ 自动图片处理上传工作流说明

## 📋 概述

这个GitHub Actions工作流自动化处理上传到仓库 `/data/` 目录的图片文件，将它们移动到 `/public/images/` 目录并进行重命名和优化。

## 🎯 功能特性

- ✅ **自动触发**：当 `/data/` 目录下有新图片文件时自动执行
- ✅ **智能重命名**：使用时间戳前缀重命名文件（格式：`timestamp_originalname.extension`）
- ✅ **图片优化**：自动优化JPG和PNG文件，减少文件大小
- ✅ **多格式支持**：支持 `jpg`, `jpeg`, `png`, `gif`, `webp` 格式
- ✅ **详细日志**：提供完整的处理过程日志和统计信息
- ✅ **自动提交**：处理完成后自动提交并推送更改

## 🚀 使用方法

### 1. 准备目录结构

```bash
your-repo/
├── .github/
│   └── workflows/
│       └── upload-image.yml
├── data/                  # 📂 上传图片到此目录
│   ├── photo1.jpg
│   ├── image2.png
│   └── ...
├── public/
│   └── images/            # 📂 处理后的图片自动移动到此目录
│   └── ...
└── ...
```

### 2. 上传图片

将图片文件推送到 `data/` 目录：

```bash
# 添加图片文件到data目录
cp your-image.jpg data/
git add data/your-image.jpg
git commit -m "添加新图片"
git push origin main
```

### 3. 自动处理

推送后，GitHub Actions会自动：
1. 🔄 检测到 `/data/` 目录中的新图片
2. 📦 移动图片到 `/public/images/`
3. 🏷️ 重命名为 `20241114_140000_your-image.jpg`
4. ⚡ 优化图片大小
5. 🚀 自动提交更改

## ⚙️ 配置说明

### 触发条件

工作流在以下情况下触发：

```yaml
on:
  push:
    paths:
      - 'data/*.jpg'
      - 'data/*.jpeg'
      - 'data/*.png'
      - 'data/*.gif'
      - 'data/*.webp'
    branches:
      - main
      - master
  workflow_dispatch:  # 手动触发
```

### 权限配置

工作流需要以下权限：

1. **GitHub Token**：自动提供用于提交和推送
2. **分支访问权限**：需要推送权限

## 📊 处理流程详解

### 步骤1：检出代码
- 使用 `actions/checkout@v4` 检出仓库代码
- 获取足够的历史记录以检测变更

### 步骤2：环境设置
- 检查并创建必要的目录结构
- 设置正确的文件权限

### 步骤3：安装依赖
- 安装 ImageMagick（图片处理）
- 安装 jpegoptim（JPEG优化）
- 安装 pngquant 和 optipng（PNG优化）
- 安装 exiftool（图片元数据）

### 步骤4：图片处理
- 查找 `/data/` 目录中的图片文件
- 生成时间戳格式的文件名
- 移动文件到 `/public/images/` 目录
- 记录处理统计信息

### 步骤5：图片优化
- JPEG文件：使用 jpegoptim 优化（质量85%）
- PNG文件：使用 pngquant 和 optipng 双重优化
- 计算优化后的文件大小节省

### 步骤6-8：Git操作
- 配置Git用户信息
- 添加更改到暂存区
- 创建详细的提交信息
- 推送到远程仓库

### 步骤9：生成报告
- 输出完整的处理报告
- 显示文件统计信息
- 提供访问链接

## 📋 输出示例

```
🖼️ 自动图片处理上传工作流
=====================

📊 处理统计:
📦 移动的文件数量: 3
⚡ 优化的文件数量: 3
⏰ 时间戳: 20241114_140000

📂 public/images/ 目录内容:
-rw-r--r-- 1 runner runner 1024567 Nov 14 14:00 20241114_140000_photo1.jpg
-rw-r--r-- 1 runner runner 856432 Nov 14 14:00 20241114_140000_image2.png
-rw-r--r-- 1 runner runner 1234567 Nov 14 14:00 20241114_140000_screenshot.webp

📊 优化结果:
photo1.jpg: 原始: 1200000B → 优化后: 1024567B (减少: 175433B, 14%)
image2.png: 原始: 950000B → 优化后: 856432B (减少: 93568B, 9%)

🔗 查看处理的图片:
🌐 GitHub仓库: https://github.com/user/repo
📁 Images目录: https://github.com/user/repo/tree/main/public/images
```

## 🛠️ 故障排除

### 常见问题

1. **权限问题**
   ```
   ⚠️ 推送失败，可能需要配置权限
   ```
   **解决方案**：确保仓库设置中允许Actions写入权限

2. **目录不存在**
   ```
   data 目录不存在
   ```
   **解决方案**：工作流会自动创建目录

3. **没有找到图片文件**
   ```
   ⚠️ 未找到图片文件
   ```
   **解决方案**：确认图片文件在 `data/` 目录中且文件扩展名正确

4. **优化失败**
   ```
   jpegoptim 优化失败
   ```
   **解决方案**：这是正常的，某些文件可能不需要优化

### 调试方法

1. 查看Actions日志
2. 检查工作流文件语法
3. 验证目录结构
4. 测试手动触发

## 🔄 手动触发

您也可以手动触发工作流：

1. 进入GitHub仓库的 **Actions** 页面
2. 选择 **自动图片处理上传工作流**
3. 点击 **Run workflow**
4. 选择分支并点击 **Run workflow**

## 📝 自定义配置

### 修改目标目录

编辑 `.github/workflows/upload-image.yml`：

```yaml
# 修改目标目录
target_path="custom/path/$new_name"
```

### 修改优化质量

```bash
# 调整JPEG优化质量
jpegoptim --max=90 "$file"  # 默认85%
```

### 添加更多图片格式

```yaml
paths:
  - 'data/*.tiff'
  - 'data/*.bmp'
  - 'data/*.svg'
```

## 🔐 安全注意事项

1. **Token权限**：工作流使用GitHub提供的默认token
2. **文件限制**：确保上传的文件是安全的图片文件
3. **目录保护**：避免处理敏感目录中的文件

## 📞 支持

如有问题，请：
1. 查看 [GitHub Actions 文档](https://docs.github.com/en/actions)
2. 检查仓库的Actions日志
3. 提交Issue或联系维护者

---

**注意**：此工作流需要在支持的操作系统上运行（ubuntu-latest），确保您的仓库配置正确。