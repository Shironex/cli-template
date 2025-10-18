# Progress Bars

Visual progress indicators using cli-progress.

## Usage

```bash
cli-template progress --type [simple|custom|multi|all]
```

## Examples

### Simple Progress
Basic progress bar:
```bash
cli-template progress --type simple
```

### Custom Progress
Styled progress with ETA and task labels:
```bash
cli-template progress --type custom
```

### Multiple Progress Bars
Parallel progress indicators:
```bash
cli-template progress --type multi
```

## Implementation

```typescript
import cliProgress from 'cli-progress';

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

bar.start(100, 0);

for (let i = 0; i <= 100; i++) {
  bar.update(i);
}

bar.stop();
```

## See Also
- [cli-progress Documentation](https://github.com/npkgz/cli-progress)
- [Table Output](/guide/table-output)
