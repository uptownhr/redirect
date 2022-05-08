const { pathsToModuleNameMapper } = require('ts-jest');
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testMatch: ['**/**.test.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s', '!<rootDir>/src/**/*.spec.ts'],
  testPathIgnorePatterns: ['./coverage/*', '.*\\.module\\.ts$'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  setupFiles: ['<rootDir>/src/ts-auto-mock-config.ts', '<rootDir>/test/test.env.ts'],
  maxWorkers: '50%',
};
