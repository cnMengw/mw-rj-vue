module.exports = {
    root: true,
    env: {
        es6: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    extends: [
        'plugin:vue/essential',
        '@vue/prettier'
    ],
    plugins: [
      'import'
    ],
    globals: {
        JsBridgeXdf: 'readonly',
        ga: 'readonly',
        st: 'readonly',
        $mvvm: 'readonly'
    },
    // 自定义规则  "off" 或 0 - 关闭规则 "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)  "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: 0, // 缩进
        'space-before-function-paren': 0, // 函数前的空格

        // 适配项目添加
        'new-cap': 0, // 构造函数名以大写字母开头
        'no-return-assign': 0, // 消除return陈述中的任务

        // 可以自动fix的配置项(--no-fix)
        semi: 0, // 语句强制分号结尾
        quotes: 0, // 单双引号
        'comma-dangle': 0, // 对象结尾是否有逗号
        'spaced-comment': 0, // 注释后加空格
        'no-trailing-spaces': 0, // 行尾不允许有空格
        'space-before-blocks': 0, // 关键字后面是否要空一格
        'key-spacing': 0, // 对象字面量中冒号的前后空格
        'keyword-spacing': 0, // 关键字冒号的前后空格
        'no-multiple-empty-lines': 0, // 最大空行数目
        'padded-blocks': 0, // 块语句内行首行尾是否要空行
        'object-curly-spacing': 0, // 大括号内是否允许不必要的空格
        'no-useless-return': 1, // 无用的return,return 优化
        'space-infix-ops': 0, // 中缀操作符周围要不要有空格
        'block-spacing': 0, // 一行内是否使用空格
        'comma-spacing': 0, // 逗号前后的空格
        'arrow-spacing': 0, // =>的前/后括号
        'semi-spacing': 0, // 分号前后空格
        'template-curly-spacing': 0, // 大括号内空格
        'func-call-spacing': 0, // 函数名称和调用它的左括号之间的空格
        'space-in-parens': 0, // 小括号里面要不要有空格
        'space-unary-ops': 1, // 一元运算符的前/后要不要加空格
        'standard/object-curly-even-spacing': 0,
        'standard/no-callback-literal': 0,
        yoda: 1, // 尤达条件
        'no-multi-spaces': 0, // 不能用多余的空格
        'no-extra-boolean-cast': 1, // 禁止不必要的bool转换
        'one-var': 0, // 连续声明
        'no-unneeded-ternary': 0, // 当存在更简单的选择时，此规则不允许三元运算符
        'object-property-newline': 0, // 对象属性换行
        'comma-style': 1, // 逗号风格，换行时在行首还是行尾
        curly: 0, // 必须使用 if(){} 中的{}
        'brace-style': 0, // 大括号风格
        'operator-linebreak': 1, // 换行时运算符在行尾还是行首
        'wrap-iife': 1, // 立即执行函数表达式的小括号风格

        // 代码风格问题，改动影响小
        'no-tabs': 0, // 是否为制表符
        'no-empty': 0,
        'no-mixed-spaces-and-tabs': 0, // 关闭禁止混用tab和空格
        'no-irregular-whitespace': 0, // 不能有不规则的空格
        'no-useless-escape': 0, // 去除不必要的转义字符
        'no-useless-constructor': 1, // 去除不必要的构造函数
        'eol-last': 0, // 文件以单一的换行符结束

        // 代码风格问题，改动易引入BUG
        camelcase: 0, // 强制驼峰法命名
        'no-sequences': 0, // 禁止使用逗号运算符
        'no-cond-assign': 1, // 禁止在条件表达式中使用赋值语句
        'no-mixed-operators': 0, // 规则可能与没有额外规则的规则相冲突

        // 以下按重要性等级排序

    // cdn_lint 1期开启规则
        eqeqeq: 2, // 必须使用全等
        'no-extend-native': 2, // 禁止扩展native对象
        'no-eval': 2,
        'no-undef': 2, // 不能有未定义的变量
        'no-var': 2,
        'no-redeclare': 2, // 禁止重复声明变量
        'prefer-promise-reject-errors': 2, // promise err错误 为error属性(new Error())

        // cdn_lint 2期开启规则
        'vue/eqeqeq': 2,
        'prefer-const': 2,
        'no-with': 2,
        'no-unreachable': 2, // 不能有无法执行的代码
        'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
        'no-duplicate-case': 2, // switch中的case标签不能重复,
        'vue/no-dupe-keys': 2,
        'vue/no-duplicate-attributes': 2,
        'import/no-duplicates': 2, // 从单个模块进行的所有导入都以单一import语句存在。
        'vue/no-parsing-error': 2,
        'vue/valid-template-root': 2,
        'vue/valid-v-if': 2,
        'vue/valid-v-else-if': 2,
        'vue/valid-v-else': 2,
        'vue/valid-v-for': 2,
        'vue/valid-v-model': 2,
        'no-use-before-define': 2, // 未定义前不能使用
        'no-case-declarations': 2,
        'no-array-constructor': 2, // 禁止使用数组构造器
        'no-new-object': 2, // 有利于性能
        'array-callback-return': 2,
        'no-useless-concat': 2,

        'no-constant-condition': 1, // 禁止在条件中使用常量表达式
        'no-unmodified-loop-condition': 0,
        'no-self-assign': 0, // 消除自我分配
        'handle-callback-err': 0, // nodejs 处理错误
        'no-unused-vars': 0, // 去除未使用变量，函数和函数的参数
        'no-unused-expressions': 0, // 禁止无用的表达式
        'no-inner-declarations': 0, // 禁止在块语句中使用声明（变量或函数）

        'vue/no-unused-vars': 0,
        'vue/no-unused-components': 0,
        'vue/require-prop-type-constructor': 0,
        'vue/return-in-computed-property': 0,
        'vue/no-side-effects-in-computed-properties': 0,
        'vue/require-v-for-key': 0,
        'vue/no-use-v-if-with-v-for': 0,
        'vue/require-valid-default-prop': 0,
        'vue/require-default-prop': 0,
        'vue/singleline-html-element-content-newline': 0,
        'vue/attribute-hyphenation': 0,
        'vue/html-indent': [0, 4],
        'vue/this-in-template': 2,
        'vue/name-property-casing': 0,
        'vue/max-attributes-per-line': 0,
        'vue/html-self-closing': 0,

        'prettier/prettier': 0,

        'quote-props': 0,
        'array-bracket-spacing': [2, 'never']
    }
};
