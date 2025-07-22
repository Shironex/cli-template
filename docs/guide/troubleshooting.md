# Troubleshooting

This guide helps you resolve common issues when using the CLI template.

## Common Issues

### Build Errors

#### TypeScript Compilation Errors

If you encounter TypeScript compilation errors:

1. Check your `tsconfig.json` settings
2. Ensure all dependencies are installed:
   ```bash
   pnpm install
   ```
3. Clear the build cache:
   ```bash
   rm -rf dist
   pnpm build
   ```

#### Module Resolution Errors

If you see module resolution errors:

1. Check your import paths are correct
2. Verify the `@` alias is properly configured in `tsconfig.json`
3. Ensure all dependencies are listed in `package.json`

### Test Failures

#### Test Environment Issues

If tests are failing:

1. Check your `vitest.config.ts` settings
2. Ensure test files are in the correct location
3. Run tests with debug mode:
   ```bash
   DEBUG=true pnpm test
   ```

#### Mocking Issues

If mocks aren't working:

1. Verify mock implementations
2. Check for proper cleanup in `afterEach`
3. Ensure mocks are properly typed

### Runtime Errors

#### Command Not Found

If commands aren't being recognized:

1. Check your `package.json` bin configuration
2. Verify the command is properly exported
3. Try reinstalling the CLI:
   ```bash
   pnpm unlink --global
   pnpm link --global
   ```

#### Permission Issues

If you encounter permission errors:

1. Check file permissions
2. Run with appropriate user permissions
3. Use `sudo` if necessary (not recommended for development)

## Debug Mode

Enable debug mode to get more detailed information:

```bash
# Set debug environment variable
DEBUG=true cli-template interactive

# Or use the debug flag
cli-template interactive --debug
```

Debug output includes:

- Command execution flow
- Configuration loading
- Error stack traces
- Performance metrics

## Error Messages

### Common Error Types

1. **Configuration Errors**

   ```
   Error: Invalid configuration file
   ```

   - Check your configuration files
   - Verify environment variables

2. **Validation Errors**

   ```
   Error: Invalid input provided
   ```

   - Check input format
   - Verify required fields

3. **Runtime Errors**

   ```
   Error: Operation failed
   ```

   - Check system resources
   - Verify dependencies

### Error Handling

The template includes built-in error handling:

```typescript
try {
  await operation();
} catch (error) {
  if (error instanceof CLIError) {
    logger.error(`CLI Error: ${error.message}`);
  } else {
    logger.error('An unexpected error occurred:', error);
  }
  process.exit(1);
}
```

## Getting Help

### Documentation

- Check the [documentation](../) for detailed guides
- Read [API reference](./api) for function documentation

### Community Support

- Open an issue on GitHub
- Check existing issues for solutions
- Join the community discussions

## Next Steps

- [Configuration](./configuration) - Learn about CLI configuration
- [Testing](./testing) - Set up your test suite
- [Best Practices](./best-practices) - Tips for CLI development
