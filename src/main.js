import core from '@actions/core';
import extractVersion from "./version-extractor.js";
// const github = require('@actions/github');

console.log('main.js run');
try {
  core.setOutput("changed", true);

  const version = await extractVersion();
  console.log(`version in main: ${version}`);
  core.setOutput("version", version);

} catch (error) {
  core.setFailed(error.message);
}

