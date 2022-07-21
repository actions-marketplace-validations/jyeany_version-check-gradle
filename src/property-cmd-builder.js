export default class PropertyCmdBuilder {

  buildCmd(propName, isWindowsFn) {
    const isWindows = isWindowsFn();
    if (isWindows) {
      return `./gradlew properties | Select-String '${propName}:'`;
    } else {
      return `./gradlew properties | grep -e '^${propName}:*'`;
    }
  }

  isWindowsFn() {
    return process.platform === 'win32';
  }

}