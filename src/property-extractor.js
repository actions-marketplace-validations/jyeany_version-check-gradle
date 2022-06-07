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
      const propertyValue = stdout.split(':')[1].trim();
      resolve(propertyValue);
    });
  })
}