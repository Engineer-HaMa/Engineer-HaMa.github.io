/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    css: false,
    reporters: ['default', ['junit', { suiteName: 'Unit Tests' }]],
    outputFile: {
      junit: './test-results/unit-results.xml',
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/pages/**/*', 'src/content.config.ts'],
      reporter: ['lcov', 'text', 'cobertura'],
    },
  },
});
