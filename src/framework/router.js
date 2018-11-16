export default class Router {
  constructor(routes) {
    console.log(window.location.hash);
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;

      routes[hash] && routes[hash]();
    });
  }
}