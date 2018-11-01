let instance;

export default class EventBus {
  constructor() {
    if (instance) return instance;

    this.events = new Map();
    /* this.events = {
      someEvent: [ () => {}, () => {} ]
    };
    */
    instance = this;
  }

  publish(eventName, data) {
    const handlers = this.events.get(eventName);

    console.log(`EVENTBUS: publishing event "${eventName}" with data ${JSON.stringify(data)}`);
    handlers.forEach((handler) => { handler(data); });
  }

  subscribe(eventName, callback) {
    const handlers = this.events.get(eventName) || [];
    this.events.set(eventName, [ ...handlers, callback ]);
  }

  unsubscribe(eventName) {
    this.events.set(eventName, null);
  }
}