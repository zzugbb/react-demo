# react-bgadmin

react基础技术栈搭建后台工程，主要描述工程搭建过程及涉及内容。

## 具体步骤

1. 工程创建
    create-react-app react-bgadmin

2. 自定义配置
    npm run eject

3. 安装依赖

    **redux相关**
    ```js
    npm install redux --save
    npm install react-redux --save
    npm install redux-devtools-extension --save-dev    //调试相关
    npm install redux-thunk --save  //异步中间件

    npm install babel-plugin-transform-decorators-legacy --save-dev
    //react-redux装饰器依赖, 需要在package.json里babel下配置plugins: transform-decorators-legacy
    ```
    **路由相关**
    ```js
    npm install  react-router --save
    npm install  react-router-dom  --save
    ```
    **请求相关**
    ```js
    npm install axios --save
    ```
4. 删除不需要内容 && 网站内容替换, 新的目录结构

    ```js
    ├── config                       # npm run eject 后弹出的配置模块
    ├── public
    │   └── favicon.ico              # Favicon
    │   └── index.html               # 对应模板文件
    │   └── manifest.json
    ├── scripts                      # npm run eject 后出现的启动相关文件
    ├── src
    │   ├── assets                   # 本地静态资源
    │   ├── components               # 公用组件
    │   ├── layouts                  # 封装的布局相关
    │   ├── pages                    # 业务页面入口和常用模板
    │   │   └── js
    │   │   └── css
    │   │   └── redux.js
    │   ├── utils                    # 工具相关，例如网络请求
    │   ├── App.css                  # 全局样式
    │   └── App.js                   # 应用页面注册,路由相关
    │   └── index.js                 # 应用入口文件
    │   └── registerServiceWorker.js
    │   └── rootRedux.js             # redux状态管理，全局状态在其中管理
    ├── .gitignore
    └── package.json
    ├── app.js                       # express工程启动入口
    ├── README.md
    └── yarn.lock
    ```

5. 引入 `ant-design`

    **安装ant-design**
    ```js
    npm install antd --save
    ```
    **按需加载**
    ```js
    npm install babel-plugin-import --save-dev
    ```
    **修改配置**
    ```js
    webpack.config.dev.js && webpack.config.prod.js
    //增加配置
    plugins: [
      ['import', { libraryName: 'antd', style: 'css' }]
    ],
    ```

6. 引入字体库

    **具体方法一**
    ```js
    import {Icon} from 'antd';
    const MyIcon = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_447315_yu00sf95bi6bt9.js', //对应的项目Symbol下生成的地址
    });

    <MyIcon type="icon-erciquerenxinxi_tishi"/>  
    ```
    **具体方法二**

    将对应字体下载进行整合使用

7. 开发
    ```js
    yarn start
    http://localhost:3000/
    ```

8. 搭建服务器 && 后续发布上线

    **安装express**
    ```js
    npm install express --save
    ```
    **根目录新建app.js**
    ```js
    //指定静态资源及页面等
    ```
    **打包**
    ```js
    yarn build
    ```
    **启动访问**
    ```js
    node app.js
    http://localhost:3000/
    ```