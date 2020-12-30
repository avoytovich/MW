// For a detailed explanation: https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  setupFiles: ['<rootDir>/setupTests.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(test).js?(x)'],
  moduleNameMapper: {
    '\\.(png|svg|pdf|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
