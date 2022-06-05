import core from '@actions/core';
import extractVersion from "./version-extractor.js";
// const github = require('@actions/github');

console.log('main.js run');
try {
  core.setOutput("changed", true);

  const version = extractVersion()
  core.setOutput("version", version);

} catch (error) {
  core.setFailed(error.message);
}

