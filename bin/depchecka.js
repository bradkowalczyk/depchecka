#! /usr/bin/env node

const fs = require('node:fs/promises');
const { exit } = require('node:process');
let config;
try {
  config = require(process.cwd() + '/package.json');
} catch (e) {
  console.error('No package.json found');
  exit(1);
}

const deps = config.dependencies;
if (!deps) {
  console.log('No dependencies found in package.json');
  exit(1);
}

const regexes = [{
  pattern: new RegExp(/([a-z0-9_]+|}) from ("|')([a-z0-9\-.]+|@[a-z0-9\-.]+\/[a-z0-9\-.]+).*?("|')/i),
  pos: 3,
}, {
  pattern: new RegExp(/(require|import)\(("|')([a-z0-9\-.]+|@[a-z0-9\-.]+\/[a-z0-9\-.]+).*?("|')/i),
  pos: 3,
}, {
  pattern: new RegExp(/import\s*("|')([a-z0-9\-.]+|@[a-z0-9\-.]+\/[a-z0-9\-.]+).*?("|');*$/i),
  pos: 2,
}];

let fileCount = 0;
const start = new Date();
processDir(process.argv[2] || './src').then(() => {
  const took = new Date().getTime() - start.getTime();
  console.log(`Processed ${fileCount} files in ${took}ms\n`);
  console.log('Unused deps:', deps);
});

async function processDir(path) {
  const dir = await fs.opendir(path);
  for await (const dirent of dir) {
    const direntPath = `${path}/${dirent.name}`;
    if (dirent.isDirectory() && dirent.name !== 'node_modules') {
      await processDir(direntPath);
    } else if (dirent.isFile() && dirent.name.match(/\.(js|jsx|ts|tsx|astro|svelte)$/)) {
      await processFile(direntPath);
    }
  }
}

async function processFile(path) {
  fileCount++;
  const fd = await fs.open(path);
  for await (const line of fd.readLines()) {
    processLine(line);
  }
}

function processLine(line) {
  regexes.some((regex) => {
    const match = line.match(regex.pattern);
    if (match) {
      const name = match[regex.pos];
      if (deps[name]) {
        delete deps[name];
        return true;
      }
    }

    return false;
  });
}
