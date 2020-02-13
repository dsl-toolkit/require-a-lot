#!/usr/bin/env node
const {join} = require('path')
const fs = require('fs')

const getFiles = require('./lib/get-files');

(async ()=>{
  const files = await getFiles(join(__dirname, '..'))
  const content = files.filter(filename=>!filename.includes('node_modules'))
  .filter(filename=>filename.endsWith('package.json')).sort()
  .map(file=>fs.readFileSync(file).toString())
  console.log(content);
})();
