#!/bin/bash
# Git 自动化部署脚本
# 功能：拉取指定分支 → 安装依赖 → 构建项目 → 迁移构建产物
 
# 配置区（根据实际情况修改）
REPO_URL="https://github.com/lumosyve/workstation.git"  # 示例：https://github.com/user/project.git 
BRANCH="master"       # 示例：develop
TARGET_DIR="/data/frontend/lumosyve/workstation"         # 构建产物迁移目标目录

# 0. 准备环境
echo "▸ 准备环境..."
echo "  - 删除旧代码..."
rm -rf source-code
echo "  - 清理旧构建产物..."
rm -rf $TARGET_DIR/dist
 
# 1. 拉取指定分支代码 
echo "▸ 正在拉取 $BRANCH 分支代码..."
git clone -b $BRANCH $REPO_URL source-code || {
    echo "✗ 代码拉取失败！请检查："
    echo "  - 仓库地址是否正确 [5]()"
    echo "  - 分支是否存在 [6]()"
    echo "  - 网络连接是否正常"
    exit 1 
}
 
# 2. 进入项目目录 
cd source-code 
 
# 3. 安装依赖
echo "▸ 正在安装依赖..."
npm install --silent || {
    echo "✗ 依赖安装失败！请检查："
    echo "  - Node.js  版本是否兼容"
    echo "  - 网络代理配置"
    exit 1
}
 
# 4. 构建项目
echo "▸ 正在构建项目..."
npm run build || {
    echo "✗ 构建失败！请检查："
    echo "  - package.json  中的 build 脚本配置"
    echo "  - 项目依赖完整性 [4]()"
    exit 1
}
 
# 5. 迁移构建产物
echo "▸ 正在迁移构建产物到 $TARGET_DIR..."
[ -d dist ] || {
    echo "✗ dist 目录不存在！请确认构建脚本输出目录"
    exit 1
}
 
sudo mv -f ./dist $TARGET_DIR/ || {
    echo "✗ 迁移失败！请检查："
    echo "  - 对 /data 目录是否有写入权限 [11]()"
    echo "  - 磁盘空间是否充足"
    exit 1
}
 
# 6. 清理临时文件
cd ..
rm -rf source-code
echo "✓ 部署完成！构建产物已保存在 $TARGET_DIR/dist"
