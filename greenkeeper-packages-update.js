#!/usr/bin/env node
const fs = require('fs')
const {join} = require('path')
const greenkeeperPath = join(__dirname, '../greenkeeper.json')
const greenkeeperConfiguration = require(greenkeeperPath)
greenkeeperConfiguration.groups.cowlog.packages = require('./lib/get-packages').map(e=>`${e}/package.json`)
fs.writeFileSync(greenkeeperPath, JSON.stringify(greenkeeperConfiguration, null, '  '))
