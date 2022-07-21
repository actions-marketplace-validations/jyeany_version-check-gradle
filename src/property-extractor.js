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
    execCallback(resolve, reject, error, stdout, stderr, cmd);
  });
}

function execLinux(resolve, reject, cmd) {
  exec(cmd, (error, stdout, stderr) => {
    execCallback(resolve, reject, error, stdout, stderr, cmd);
  });
}

function execCallback(resolve, reject, error, stdout, stderr, cmd) {
  if (error) {
    reject(error);
  }
  if (stderr) {
    reject(stderr);
  }
  if (!stdout) {
    const msg = `No results found with: ${cmd}`;
    reject(msg);
  }
  const outParts = stdout.split(':');
  if (outParts.length < 2 || outParts[1] === undefined || !outParts[1] instanceof String) {
    const msg = `Value not set for property found with: ${cmd}`;
    reject(msg);
  }
  const propertyValue = outParts[1].trim();
  resolve(propertyValue);
}
