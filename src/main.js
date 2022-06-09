import core from '@actions/core';
import extractProperty from "./property-extractor.js";
import VersionClient from "./version-client.js";
// const github = require('@actions/github');

try {
  const versionClient = new VersionClient();
  const version = await extractProperty('version');
  const group = await extractProperty('group');
  const projectName = await extractProperty('archivesBaseName');
  const packageName = group + '.' + projectName;
  const orgName = core.getInput('organization');
  const accessToken = core.getInput('access-token');
  const found = await versionClient.isVersionPresent(packageName, version, orgName, accessToken);
  const changed = !found;

  core.setOutput("changed", changed);
  core.setOutput("version", version);
} catch (error) {
  core.setFailed(error.message);
}
