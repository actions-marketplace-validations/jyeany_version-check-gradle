import axios from "axios";

export default class VersionClient {

  async isVersionPresent(packageName, version, orgName, accessToken) {
    if (orgName) {
      return this.findVersionForOrganization(packageName, version, orgName, accessToken);
    } else {
      return this.findVersionForUser(packageName, version, accessToken);
    }
  }

  async findVersionForOrganization(packageName, version, orgName, accessToken) {
    const reqUrl = `https://api.github.com/orgs/${orgName}/packages/maven/${packageName}/versions`;
    try {
      const res = await this.makeRequest(reqUrl, accessToken);
      return this.checkIfVersionIn(version, res.data);
    } catch (err) {
      console.log(`status: ${err.response.status}`);
      return true;
    }
  }

  async findVersionForUser(packageName, version, accessToken) {
    const reqUrl = `https://api.github.com/users/jyeany/packages/maven/${packageName}/versions`;
    try {
      const res = await this.makeRequest(reqUrl, accessToken);
      return this.checkIfVersionIn(version, res.data);
    } catch (err) {
      console.log(`status: ${err.response.status}`);
      return true;
    }
  }

  async makeRequest(reqUrl, accessToken) {
    return axios
      .get(reqUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
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
