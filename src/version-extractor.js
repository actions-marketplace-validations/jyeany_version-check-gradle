import { exec } from "child_process";

export default function extractVersion() {
  exec("./gradlew properties | grep 'version:'", (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    if (stderr) {
      throw stderr;
    }
    return stdout.split(':')[1].trim()
  });
}