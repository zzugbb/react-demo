# 说明

此文件用来对 eslintrc 文件说明。

此工程中只有一个 `eslintrc` 文件实现校验，是因为编辑器 `vscode` 集成了插件，直接写配置文件即可生效。[梳理文档](https://github.com/zzugbb/share-docs/wiki/eslint)

## 具体说明

```json
{
  "env": { //指定环境,此处指定浏览器和node, 如若不然，例如console会报错，因为在其它环境可能没有console
    "browser": true,
    "node": true,
    "es6": true  //支持es6语法，启用除了 modules 以外的所有 ECMAScript 6 特性
  },
  "parser": "babel-eslint",  //指定解析器
  "plugins": [              //指定插件，插件名可以省略 `eslint-plugin-`
    "react"
  ],
  "extends": [              //规则继承
    "eslint: recommended",   //eslint的推荐规则
    "plugin: react/recommended" //插件react的推荐规则
  ],
  "rules": {   //规则
    "no-console": "off",  //禁用console, 此处关闭，recommended启用的
    "react/prop-types": 0,  //0=off,1=warn,2=error.Defaults to 0，此处重新设置为0，是因为react/recommended启用了一些规则
    "indent": ["error", 2, {"SwitchCase": 1}],  //强制使用两个空格控制缩进，switch-case里面也是两个空格
    "array-bracket-spacing": [2, "never"],  //数组中前后不含空格
    "block-scoped-var": 1,   //块级作用域外访问块内定义的变量报错，0不报错
    "brace-style": [2, "1tbs"],  //if while function 后面的{必须与if在同一行，java风格。0=off,1=warn,2=error
    "comma-dangle": [2, "never"], //对象最后一个键值对不要空格
    "comma-spacing": [2, {"before": false, "after": true}], //控制逗号前后的空格,前面不要
    "comma-style": [2, "last"],  //逗号在行尾出现
  }
}
```

## 参考

* [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
* [react/prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/prop-types.md)
* [ESLint 规范项目代码](https://www.cnblogs.com/littlesummer/p/6762855.html)
* [Eslint 规则说明](https://blog.csdn.net/helpzp2008/article/details/51507428)