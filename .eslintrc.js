module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'error',
    'react/prop-types': 'off',
    'import/named': 'error',
    'import/default': 'error',
    'import/export': 'error'
  }
};
