function Observable() {
  this.observers = [];
}

Observable.prototype = {
  subscribe: function (fn) {
    this.observers.push(fn);
  },

  unsubscribe: function (fn) {
    this.observers = this.observers.filter(function (item) {
      if (item !== fn) {
        return item;
      }
    });
  },

  notify: function (data, type) {
    this.observers.forEach((observer) => observer.updateValues(data, type));
  },
};

export default Observable;
