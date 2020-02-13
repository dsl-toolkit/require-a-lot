#!/usr/bin/env node
const recursive = require('recursive-readdir')
const path = require('path')
const fs = require('fs')
const sha1 = require('sha1')

recursive(path.join(__dirname, '..'), function (err, files) {
    const hash = sha1(files.filter(filename=>!filename.includes('node_modules'))
           .filter(filename=>filename.endsWith('package.json'))
           .map(file=>fs.readFileSync(file).toString())
           .map(conents=>sha1(conents)).sort().join()
    )
  // `files` is an array of file paths
  console.log(hash);
});
