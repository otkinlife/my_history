# 使用官方 Node.js 作为基础镜像
FROM library/node

# 设置工作目录
WORKDIR /usr/src/app

# 复制当前目录下的所有文件到工作目录中
COPY . .

# 安装项目依赖
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

# 暴露端口（如果需要的话）
EXPOSE 3000

# 运行 npm start
CMD [ "npm", "start" ]
