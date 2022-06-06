import axios from "axios";

export default async function isVersionPresent(packageName, version, orgName, accessToken) {
  if (orgName) {
    return findVersionForOrganization(packageName, version, orgName, accessToken);
  } else {
    return findVersionForUser(packageName, version, accessToken);
  }
}

async function findVersionForOrganization(packageName, version, orgName, accessToken) {

}

async function findVersionForUser(packageName, version, accessToken) {
  const reqUrl = `https://api.github.com/users/jyeany/packages/maven/${packageName}/versions`;
  const res = await axios
    .get(reqUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
  return checkIfVersionIn(version, res.data);
}

function checkIfVersionIn(version, packageVersions) {
  let found = false;
  for (let i = 0; i < packageVersions.length; i++) {
    const name = packageVersions[i].name;
    if (name === version) {
      found = true;
      break;
    }
  }
  return found;
}
