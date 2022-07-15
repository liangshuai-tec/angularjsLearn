# angularjsLearn
angularjs学习


# 项目配置更改项

## tsconfig.json
"importHelpers": true 时， 会在使用了 __extends 和 __assign 的 js 文件中引入这条语句：

var tslib_1 = require("tslib");

输出的模块格式是 commonjs

需要更改：
    "module": "es2020",  规范更改为
    "module": "commonjs"


