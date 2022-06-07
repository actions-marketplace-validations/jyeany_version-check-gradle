import { exec } from "child_process";

export default async function extractProperty(propName) {
  const cmd = `./gradlew properties | grep '${propName}:'`;
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