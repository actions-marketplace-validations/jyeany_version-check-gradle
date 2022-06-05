const core = require('@actions/core');
const { exec } = require("child_process");
// const github = require('@actions/github');

console.log('main.js run');
try {
  core.setOutput("changed", true);
  core.setOutput("version", "any");

  exec("./gradlew properties", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

} catch (error) {
  core.setFailed(error.message);
}

