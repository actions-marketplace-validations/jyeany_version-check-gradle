import { exec } from "child_process";
import PropertyCmdBuilder from "./property-cmd-builder.js";

const cmdBuilder = new PropertyCmdBuilder();

export default async function extractProperty(propName) {
  const cmd = cmdBuilder.buildCmd(propName, cmdBuilder.isWindowsFn);
  const isWindows = cmdBuilder.isWindowsFn();
  return new Promise((resolve, reject) => {
    if (isWindows) {
     execPowershell(resolve, reject, cmd);
    } else {
     execLinux(resolve, reject, cmd);
    }
  });
}

function execPowershell(resolve, reject, cmd) {
  exec(cmd, {'shell':'powershell.exe'}, (error, stdout, stderr) => {
    if (error) {
      reject(error);
    }
    if (stderr) {
      reject(stderr);
    }
    console.log(`powershell output: ${stdout}`);
    const propertyValue = stdout.split(':')[1].trim();
    resolve(propertyValue);
  });
}

function execLinux(resolve, reject, cmd) {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      reject(error);
    }
    if (stderr) {
      reject(stderr);
    }
    console.log(`linux output: ${stdout}`);
    const propertyValue = stdout.split(':')[1].trim();
    resolve(propertyValue);
  });
}
