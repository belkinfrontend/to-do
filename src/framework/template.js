export default function template(strings, ...args) {
  return strings.reduce((acc, str, i) => acc + str + (args[i] ? args[i] : ''), '');
}