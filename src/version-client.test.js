import VersionClient from "./version-client.js";

const versionClient = new VersionClient();

const stubPackageVersions = [
  {
    "id": 20383580,
    "name": "0.0.2",
    "url": "https://api.github.com/users/jyeany/packages/maven/com.example.version-check-gradle-consumer/versions/20383580",
    "package_html_url": "https://github.com/jyeany/version-check-gradle-consumer/packages/1461777",
    "created_at": "2022-06-05T18:51:48Z",
    "updated_at": "2022-06-05T18:51:48Z",
    "html_url": "https://github.com/jyeany/version-check-gradle-consumer/packages/1461777?version=0.0.2",
    "metadata": {
      "package_type": "maven"
    }
  },
  {
    "id": 20378898,
    "name": "0.0.1",
    "url": "https://api.github.com/users/jyeany/packages/maven/com.example.version-check-gradle-consumer/versions/20378898",
    "package_html_url": "https://github.com/jyeany/version-check-gradle-consumer/packages/1461777",
    "created_at": "2022-06-05T00:05:57Z",
    "updated_at": "2022-06-05T00:05:57Z",
    "html_url": "https://github.com/jyeany/version-check-gradle-consumer/packages/1461777?version=0.0.1",
    "metadata": {
      "package_type": "maven"
    }
  }
]

test('when version does not exist in array, returns false', () => {
  const version = "1.2.3";
  const result = versionClient.checkIfVersionIn(version, stubPackageVersions);
  expect(result).toBeFalsy();
});

test('when version is in array, returns true', () => {
  const version = "0.0.2";
  const result = versionClient.checkIfVersionIn(version, stubPackageVersions);
  expect(result).toBeTruthy();
});
