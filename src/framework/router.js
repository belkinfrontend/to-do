export default class Router {
  constructor(routes) {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;

      routes[hash] && routes[hash]();
    });
  }
}