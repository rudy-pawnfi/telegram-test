module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'airbnb',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'prettier',  // 禁用 ESLint 中与 Prettier 冲突的规则
      'plugin:prettier/recommended', // 启用 Prettier 作为 ESLint 的插件
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
      'react-hooks',
      'jsx-a11y',
      'import',
      'prettier', // 启用 prettier 插件
    ],
    rules: {
      'prettier/prettier': 'error', // 使用 Prettier 进行格式化
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  };
  