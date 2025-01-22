// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  testPathIgnorePatterns: ['.*\\.spec\\.ts$', '.*\\.model\\.ts$', '.*\\.module\\.ts$'],

  // Coverage configuration
  coverageDirectory: './coverage', // Match exact path
  coverageReporters: ['lcov', 'text', 'text-summary'],
  collectCoverage: true,
  coverageProvider: 'v8', // Explicitly set coverage provider
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.spec.ts',
    '!src/**/*.model.ts',
    '!src/**/*.module.ts',
    '!src/**/*.d.ts',
    '!src/**/index.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],

  // Additional configurations to ensure accurate coverage
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.jest.json',
        diagnostics: {
          ignoreCodes: ['TS151001'],
        },
      },
    ],
  },

  // Ensure cache doesn't interfere
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};

export default config;
