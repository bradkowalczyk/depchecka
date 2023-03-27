# depchecker
A simple node.js script for listing unused dependencies that are in your `package.json`.

`depchecker` will load `package.json` from the current working directory to read the list of dependencies and then recursively traverse the directory tree starting at the specified directory path, processing all javascript files (`.js`, `.jsx`, `.ts`, `.tsx`, `.astro`, `.svelte`). The list of dependencies not found used in any of those files is shown on completion.

## Usage
From the root of your project (where `package.json` lives) run:
```
npx depchecker ./path/to/entry-point
```

`./path/to/entry-point` should be your source directory or where you want `depchecker` to start recursively looking for deps used (defaults to `./src`).

### Example
```
npx depchecker ./src
Processed 1288 files in 496ms

Unused deps: {
  '@material-ui/lab': '4.0.0-alpha.60',
  'arrow-keys-react': '1.0.6',
  'date-fns': '2.16.1',
  'intl-messageformat-parser': '4.1.1',
  'react-fast-compare': '3.2.0',
  'react-input-autosize': '2.2.2',
  'react-intl-context': '1.0.3',
  'react-transition-group': '4.4.1',
  stylis: '4.1.0'
}
```
