/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var EX, Arraynge = require('arraynge');

  EX = function arrayngeAndThen(actions, from, upto, list) {
    if (!Array.isArray(actions)) { actions = String(actions).match(/\w+/g); }
    return actions.reduce(EX.step, new Arraynge(from, upto, list));
  };

  EX.step = function (tmp, acn) {
    if (!tmp) { return tmp; }
    switch (acn && typeof acn) {
    case 'function':
      return acn(tmp);
    case 'string':
      return EX.mthd.call(tmp, acn);
    case 'object':
      return EX.mthd.apply(tmp, acn);
    }
    throw new Error('unsupported step: <' + (typeof acn) + '> ' + String(acn));
  };

  EX.mthd = function (arg1) {
    var func = this[arg1];
    if ((typeof func) !== 'function') {
      throw new Error('bad method name ' + JSON.stringify(arg1) +
        ' for <' + (typeof this) + '> ' + String(this));
    }
    arg1 = this;  // using argument swap and double .apply to save one [].slice
    return Function.apply.apply(func, arguments);
  };





















  return EX;
}());
