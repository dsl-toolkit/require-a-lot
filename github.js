#!/usr/bin/env node
require('cowlog')()
// const octokit = require('@octokit/rest')
const token = '32cdd4128b64add24c69503b96a3cb9d307c7e88'

const { createTokenAuth } = require("@octokit/auth-token");
const { request } = require("@octokit/request");
const { graphql } = require("@octokit/graphql");
const packages = require('./lib/get-packages');
const pacageNames = packages.map(e=>require(`../${e}/package.json`).name);
const diff = require('diff');

(async () => {

    const result = await request("GET /users/311ecode/repos", {
        headers: {
            authorization: "token " + token
        },
    });
    const existingRepos = result.data.map(e=>e.name)
    const toCreate = diff.diffArrays(pacageNames, existingRepos).filter(e=>e.removed).map(e=>e.value).flat()

    toCreate.forEach(async repository=> await request("POST /user/repos", {
        headers: {
            authorization: "token " + token
        },
        name: repository
    }))git
})()
