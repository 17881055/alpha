module.exports = {
  root: true,
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    semi: [1, 'always'],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'space-before-function-paren': [0, 'always'],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-undef': 'off'
  }
};
