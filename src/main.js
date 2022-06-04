const core = require('@actions/core');
// const github = require('@actions/github');

console.log('main.js run');
try {
  core.setOutput("changed", true);
  core.setOutput("version", "any");
} catch (error) {
  core.setFailed(error.message);
}

