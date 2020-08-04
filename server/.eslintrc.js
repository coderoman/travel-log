module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: ['prettier', 'airbnb-base'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'prettier/prettier': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
  },
};
