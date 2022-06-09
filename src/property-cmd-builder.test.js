import PropertyCmdBuilder from "./property-cmd-builder.js";

const cmdBuilder = new PropertyCmdBuilder();

test('uses Select-String for windows', () => {
  const isWindowsFn = function() {
    return true;
  }
  const result = cmdBuilder.buildCmd('property', isWindowsFn);
  expect(result).toContain('Select-String');
});

test('uses grep for non-windows', () => {
  const isWindowsFn = function() {
    return false;
  }
  const result = cmdBuilder.buildCmd('property', isWindowsFn);
  expect(result).toContain('grep');
});

test('detects if running in windows', () => {
  const expected = process.platform === 'win32';
  const result = cmdBuilder.isWindowsFn();
  expect(result).toBe(expected);
});