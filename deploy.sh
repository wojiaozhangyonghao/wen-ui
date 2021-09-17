#!/usr/bin/env sh
###
 # @Author: zyh
 # @Date: 2021-09-17 11:23:46
 # @LastEditors: zyh
 # @LastEditTime: 2021-09-17 11:26:39
 # @Description: file content
### 

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
# cd docs/.vuepress/dist
cd dist
git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
#git push -f git@github.com:wojiaozhangyonghao/wojiaozhangyonghao.github.io.git master
git push -f git@github.com:wojiaozhangyonghao/wen-ui.git master:gh-pages
# 例如 git push -f git@github.com:koala-coding/blog.git master:gh-pages 
cd -