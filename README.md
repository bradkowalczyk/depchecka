# depchecka
A simple node.js script for finding unused dependencies that are in your `package.json`.

`depchecka` will load the list of `dependencies` from the `package.json` file found in the current working directory and then recursively traverse the directory tree starting at the specified directory path, processing all javascript files (`.js`, `.jsx`, `.ts`, `.tsx`, `.astro`, `.svelte`), looking for use of those dependencies. The list of unused dependencies is shown on completion.

*NOTE: Some frameworks may include dependencies in `package.json` that may be listed as unused by this tool. Also, if you have installed dev dependencies as regular dependencies these may also be listed as unused.*

## Usage
From the root of your project (where the main `package.json` lives) run:
```
npx depchecka ./path/to/entry-point
```

`./path/to/entry-point` should be your source directory or where you want `depchecka` to start recursively looking for dependencies used (defaults to `./src`).

### Example
```
➜ npx depchecka ./src
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

### Pre-requisites
`depchecka` requires node >= 18.11.0 in order to run
