export const observe = (obj, cb) => {
  const validator = {
    get(target, key) {
      if (typeof target[key] === 'object' && target[key] !== null) {
        return new Proxy(target[key], validator);
      }
      return target[key];
    },
    set(target, key, value) {
      if (target[key] !== value) {
        Reflect.set(target, key, value);
        cb && cb(...arguments);
      }
      return true;
    }
  };
  return new Proxy(obj, validator);
}

export const generateId = (n) => (Math.floor(Math.random()*Math.pow(16, n))).toString(16);