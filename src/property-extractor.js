import { exec } from "child_process";
import PropertyCmdBuilder from "./property-cmd-builder.js";

const cmdBuilder = new PropertyCmdBuilder();

export default async function extractProperty(propName) {
  const cmd = cmdBuilder.buildCmd(propName, cmdBuilder.isWindowsFn);
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