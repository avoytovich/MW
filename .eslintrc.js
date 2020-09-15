module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  plugins: [
    'react',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  rules: {
    // additional rules
    'no-unused-expressions': 0,
    'jsx-quotes': 0,
  },
};
