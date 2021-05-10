module.exports = {
  root: true,
  extends: ['./configs/base.eslint.json'],
  ignorePatterns: ['**/{node_modules,lib}', '*.js'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  rules: {
    'no-unused-vars': 1,
  },
};
