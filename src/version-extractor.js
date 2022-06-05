import { exec } from "child_process";

export default async function extractVersion() {
  const cmd = "./gradlew properties | grep 'version:'";
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      const versionNumber = stdout.split(':')[1].trim();
      resolve(versionNumber);
    });
  })
}