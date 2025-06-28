// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // Use ts-jest with our new config:
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      { tsconfig: 'tsconfig.jest.json' }
    ],
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
