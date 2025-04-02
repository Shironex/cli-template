# Configuration

This guide explains how to configure your CLI application using the template.

## Environment Variables

The template supports environment variables for configuration:

```bash
# Development mode
NODE_ENV=development

# Debug mode
DEBUG=true

# Custom configuration
CUSTOM_CONFIG=value
```

## Configuration Files

### TypeScript Configuration

The template uses `tsconfig.json` for TypeScript settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist",
    "rootDir": ".",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules"]
}
```

### Build Configuration

The template uses `tsup.config.ts` for build settings:

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  target: 'node20',
  outDir: 'dist',
  noExternal: ['commander'],
});
```

### Test Configuration

The template uses `vitest.config.ts` for test settings:

```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### ESLint Configuration

The template uses `eslint.config.js`:

```javascript
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      // Custom rules
    },
  },
];
```

### Prettier Configuration

The template uses `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

## Next Steps

- [Basic Commands](./basic-commands) - Learn how to create CLI commands
- [Interactive Mode](./interactive-mode) - Add interactive prompts
- [Testing](./testing) - Set up your test suite
- [Best Practices](./best-practices) - Tips for CLI development
