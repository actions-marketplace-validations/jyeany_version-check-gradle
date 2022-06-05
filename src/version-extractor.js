import { exec } from "child_process";

export default function extractVersion() {
  exec("./gradlew properties | grep 'version:'", (error, stdout, stderr) => {
    if (error) {
      console.log(error)
      throw error;
    }
    if (stderr) {
      console.log(stderr)
      throw stderr;
    }
    console.log(stdout)
    return stdout.split(':')[1].trim()
  });
}