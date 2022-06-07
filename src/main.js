import core from '@actions/core';
import extractProperty from "./property-extractor.js";
import VersionClient from "./version-client.js";
// const github = require('@actions/github');

console.log('main.js run');
try {
  const versionClient = new VersionClient();
  const version = await extractProperty('version');
  const group = await extractProperty('group');
  const projectName = await extractProperty('name');
  const packageName = group + '.' + projectName;
  console.log(`version in main: ${version}`);

  const orgName = core.getInput('organization');
  const accessToken = core.getInput('access-token');
  const found = versionClient.isVersionPresent(packageName, version, orgName, accessToken);
  const changed = !found;
  core.setOutput("changed", changed);
  core.setOutput("version", version);

} catch (error) {
  core.setFailed(error.message);
}

