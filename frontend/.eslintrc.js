module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'arrow-parens': 0, // allow paren-less arrow functions,
        'generator-star-spacing': 0, // allow async-await,
        semi: [2, 'always'],
        indent: [2, 4, { VariableDeclarator: 1 }]
    }
};
