# Table Output

Display formatted data in tables using cli-table3.

## Usage

```bash
cli-template table --style [simple|complex|custom|all]
```

## Examples

### Simple Table
Basic table with headers and data:
```bash
cli-template table --style simple
```

### Complex Table
Colored table with package stats:
```bash
cli-template table --style complex
```

### Custom Table
Styled table with borders and indicators:
```bash
cli-template table --style custom
```

## Implementation

```typescript
import Table from 'cli-table3';

const table = new Table({
  head: ['Name', 'Email', 'Role'],
  colWidths: [20, 30, 15]
});

table.push(
  ['John Doe', 'john@example.com', 'Developer']
);

console.log(table.toString());
```

## See Also
- [cli-table3 Documentation](https://github.com/cli-table/cli-table3)
- [Interactive Mode](/guide/interactive-mode)
