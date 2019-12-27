## 走进babel(7.0)

### babel 是什么
#### Babel 是一个 JavaScript 编译器

```
Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。下面列出的是 Babel 能为你做的事情：

语法转换
通过Polyfill方式在目标环境中添加缺失的特性 (通过plugin)
源码转换 (codemods)

```


### babel 设计思路

- 转化流程
 origin code => ast    =>  new ast   =>  new code

```
相关 cmd命令
 #origin code => ast
 npm run parser

 #ast => new ast
 npm run transformAst

 #new ast => new code 
 npm run generator

 #origin code => new code 
 npm run transform

```

- 插件系统(基于ast-抽象语法树/配置且可插拔-babel 工程内部包分析)
  

```
工具类 =>  babel-helper-*
针对新语法 =>  babel-plugin-syntax-*
针对新提议 =>  babel-plugin-proposal-*
针对代码转化 =>  babel-plugin-transform-*
```
Eg
1. [plugin](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
```javascript

module.exports = (api, options) => {
    api.assertVersion(7);
    console.log('plugin-options-c', options)
  
    return {
      name: "transform-c",
      pre() {
        console.log('plugin-c-pre');
      },
      post() {
        console.log('plugin-c-post');
      },
      visitor: {
        Identifier(path) {
            if(path.node.name == 'a'){
                console.log('plugin-c-visitor');
                // path.node.name = 'c';
            }
        },
      }
    };
  };
```

2. [preset](https://babeljs.io/docs/en/next/presets) [es6+](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

```
预设说明

现有的并推荐的预设
@babel/preset-env  
@babel/preset-flow
@babel/preset-react
@babel/preset-typescript
@babel/preset-minify

被废弃的预设
@babel/preset-stage-0
@babel/preset-stage-1
@babel/preset-stage-2
@babel/preset-stage-3
```

eg
```javascript

module.exports = function (api, options){
    console.log('preset-options-a', options);
    return {
        plugins: [
            require('../plugins/babel-plugin-c')
        ]
    }
}
```

1. [options](https://babeljs.io/docs/en/next/options)配置项、[babel-config](https://babeljs.io/docs/en/next/config-files)配置文件规则
```javascript

module.exports = function(api) {
    return {
        plugins: [
            ['@babel/transform-runtime'],
            '@babel/plugin-proposal-class-properties',
            require('./plugins/babel-plugin-a')
        ],
        presets: [
            ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3
            }],
            require('./persets/babel-preset-a')
        ]
    }
}
```
### 插件执行顺序
```
    如果两个转换插件都将处理“程序（Program）”的某个代码片段，则将根据转换插件或 preset 的排列顺序依次执行。
```

1. 插件在 Presets 前运行。
2. 插件顺序从前往后排列。
3. Preset 顺序是颠倒的（从后往前）


### babel的各种使用方式
1. cli命令行编译文件: 相关插件  @babel/cli   eg: `npm run babel-cli`
2. 命令行执行nodejs文件: 相关插件  @babel/node   eg: `npm run babel-node`
3. nodejs中使用: 相关插件  @babel/register eg: `npm run babel-register`
4. webpack中使用: 相关插件 babel-loader eg: `npm run build`
   

### 重要相关插件

1. [babel-loader](https://www.npmjs.com/package/babel-loader)  webpack 的loader
2. [browserslist](https://www.npmjs.com/package/browserslist)   通过此模块加上相关配置 可将新语法代码转化为目标浏览器可识别的代码
3. [core-js](https://github.com/zloirock/core-js)  按需转化对应模块的源码仓库
4. [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime)   转化generator 和async/await语法的模块
5. [source-map](https://www.npmjs.com/package/source-map)  生成source-map 利于调试



### 遇到的问题
```
eg: webpack 打包
Promise.resolve(1).then(() => {}); import('.a').then(() => {

})

plugin   
 ['@babel/transform-runtime', {
        corejs: 3,
        useESModules: true,
}]

用等同promise 的方法替换 Promise  不污染全局Promise;
非经过babel 编译的代码中出现的Promise 在不支持Promise的浏览器中 会Promise未定义报错；    
-----------
preset  
['@babel/preset-env', {
    useBuiltIns: 'usage',
    corejs: 3
}]

全局 按需添加Promise的垫片  上例中的import('./a') webpack 会将其 编译成 包含Promise.all 的代码
在不支持Promise 的浏览器中 这样配置 按需加载会报错

```

### 参考资料
[babel官网](https://babeljs.io/docs/en/next/)
[babel仓库](https://github.com/babel/babel)
[babel-loader](https://github.com/babel/babel-loader)


### 相关工具
[在线code => ast](https://astexplorer.net/)