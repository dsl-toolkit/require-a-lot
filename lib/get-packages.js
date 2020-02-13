#!/usr/bin/env node
const execa = require('execa')
const diff = require('diff')

const {stdout} = execa.sync('npx', ['lerna', 'list', '--json'])

module.exports = JSON
    .parse(stdout)
    .map(enty=>diff.diffWords(__dirname, enty.location))
    // .map(e=>e.pop().value)
    .map(e=>e.slice(2).filter(e=>e.removed !== true).map(e=>e.value).join('')).sort()

