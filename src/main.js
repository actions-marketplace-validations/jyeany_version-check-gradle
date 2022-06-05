const core = require('@actions/core');
const { exec } = require("child_process");
const versionExtractor = require('version-extractor');
// const github = require('@actions/github');

console.log('main.js run');
try {
  core.setOutput("changed", true);

  const version = versionExtractor()
  core.setOutput("version", version);

} catch (error) {
  core.setFailed(error.message);
}

