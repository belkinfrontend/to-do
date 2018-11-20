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
        cb && setTimeout(() => { cb(...arguments); }, 0);
      }
      return true;
    }
  };
  return new Proxy(obj, validator);
}

export const generateId = (n) => (Math.floor(Math.random()*Math.pow(16, n))).toString(16);

/** escapeHtml - validation */
export const escapeHtml = (text) => {
  let map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

/** formatDate */
export const formatDate = (date) => {
  let monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}