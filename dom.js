(function (win, doc) {
  'use strict';

  function DOM(element) {
    this.elements = doc.querySelectorAll(element);
    return this;
  }

  DOM.prototype.get = function get() {
    return this.elements;
  };

  DOM.prototype.on = function on(event, callback) {
    this.elements.forEach(function (element) {
      element.addEventListener(event, callback, false);
    });
  };

  DOM.prototype.off = function off(event, callback) {
    this.elements.forEach(function (element) {
      element.removeEventListener(event, callback, false);
    });
  };

  DOM.prototype.forEach = function forEach(callback) {
    return Array.prototype.forEach.call(this.elements, callback);
  };

  DOM.prototype.map = function map(callback) {
    return Array.prototype.map.call(this.elements, callback);
  };

  DOM.prototype.filter = function filter(callback) {
    return Array.prototype.filter.call(this.elements, callback);
  };

  DOM.prototype.reduce = function reduce(callback) {
    return Array.prototype.reduce.call(this.elements, callback);
  };

  DOM.prototype.reduceRight = function reduceRight(callback) {
    return Array.prototype.reduceRight.call(this.elements, callback);
  };

  DOM.prototype.every = function every(callback) {
    return Array.prototype.every.call(this.elements, callback);
  };

  DOM.prototype.some = function some(callback) {
    return Array.prototype.some.call(this.elements, callback);
  };

  DOM.typeOf = function typeOf(element) {
    return Object.prototype.toString.call(element).slice(8, -1);
  };

  DOM.isArray = function isArray(element) {
    return this.typeOf(element) === 'Array';
  };

  DOM.isFunction = function isFunction(element) {
    return this.typeOf(element) === 'Function';
  };

  DOM.isObject = function isObject(element) {
    return this.typeOf(element) === 'Object';
  };

  DOM.isNumber = function isNumber(element) {
    return this.typeOf(element) === 'Number';
  };

  DOM.isString = function isString(element) {
    return this.typeOf(element) === 'String';
  };

  DOM.isBoolean = function isBoolean(element) {
    return this.typeOf(element) === 'Boolean';
  };

  DOM.isNull = function isNull(element) {
    return this.typeOf(element) === 'Null' ? true : undefined;
  };

  win.DOM = DOM;
})(window, document);
