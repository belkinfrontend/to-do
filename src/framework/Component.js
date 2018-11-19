import { observe, generateId } from './utils';

export default class Component {
  constructor(data = {}) {
    this.update = this.update.bind(this);
    this.clearRoot = this.clearRoot.bind(this);

    /* create observable from passed data argument. Set this.update as a callback fn to observe any data update. Assign it to 'this.model' attribute */
    this.model = observe(data, this.update);

    /* set isMounted flag to false, since there is no HTML representation of this view yet, just an object */
    this.isMounted = false;

    /* create container HTML element that will contain rendered view */
    this.containerElement = document.createElement('div');

    /* generate random ID and set it to this.id */
    this.id = generateId(6);

    /* set HTML id to container HTML element */
    this.containerElement.id = `view_${this.id}`;
    this.containerElement.setAttribute('class', 'container');
  }

  /**
   * @param {*} root - Root HTML element to contain view representation.
   */
  mountTo(root) {
    this.rootElement = root;
    this.clearRoot();
    this.update();
    this.patchEvents();

    !this.isMounted && this.attachEvents();
    this.rootElement.appendChild(this.containerElement);
    this.isMounted = true;
    this.onComponentMount();
  }

  /**
   * 'eventName @@ elementQuery': callbackFn
   */
  eventMap = {};

  patchEvents() {
    for (let key in this.eventMap) {
      const handler = this.eventMap[key];
      const [eventName, query] = key.split(' @@ ');
      const patchedHandler = (event) => {
        if (
          event.type === eventName &&
          Array.from(document.querySelectorAll(query)).includes(event.target)
        ) {
          handler(event);
        }
      }
      this.eventMap[key] = patchedHandler;
    }
  }

  onComponentMount = () => {};
  onComponentUpdate = () => {};
  onComponentDestroy = () => {};

  render() {
    return '';
  }

  attachEvents() {
    for (let key in this.eventMap) {
      const [eventName] = key.split(' @@ ');
      this.containerElement.addEventListener(eventName, this.eventMap[key]);
    }
  }

  update() {
    this.containerElement.innerHTML = this.render();
    this.isMounted && this.onComponentUpdate();
  }

  clearRoot() {
    if(this.rootElement) {
      while (this.rootElement.firstChild) {
        this.rootElement.removeChild(this.rootElement.firstChild);
      }
    }
    
  }

  unmount() {
    for (let key in this.eventMap) {
      const [eventName, query] = key.split(' @@ ');
      this.containerElement.removeEventListener(eventName, this.eventMap[key]);
    }
    this.clearRoot();
    this.isMounted = false;
    this.onComponentDestroy();
  }
}
