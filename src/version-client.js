import axios from "axios";

export default class VersionClient {

  async isVersionPresent(packageName, version, orgName, accessToken) {
    try {
      if (orgName) {
        return this.findVersionForOrganization(packageName, version, orgName, accessToken);
      } else {
        return this.findVersionForUser(packageName, version, accessToken);
      }
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }

  async findVersionForOrganization(packageName, version, orgName, accessToken) {
    const reqUrl = `https://api.github.com/orgs/${orgName}/packages/maven/${packageName}/versions`;
    const res = await axios
      .get(reqUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
    return this.checkIfVersionIn(version, res.data);
  }

  async findVersionForUser(packageName, version, accessToken) {
    const reqUrl = `https://api.github.com/users/jyeany/packages/maven/${packageName}/versions`;
    const res = await axios
      .get(reqUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
    return this.checkIfVersionIn(version, res.data);
  }

  checkIfVersionIn(version, packageVersions) {
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

}
