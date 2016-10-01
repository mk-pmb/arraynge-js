/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var CF, PT, isFin = Number.isFinite;

  function isObj(x) { return ((x && typeof x) === 'object'); }
  // function finOr(x, dflt) { return (isFin(x) ? x : dflt); }

  CF = function Arraynge(from, upto, list) {
    if (!(this instanceof CF)) { return new CF(from, upto, list); }
    this[0] = from;
    this[1] = upto;
    this.listLen = 0;
    if (isObj(list)) { this.list(list); }
    this.length = 2;
  };
  PT = CF.prototype;


  CF.withThisList = function (from, upto) { return new CF(from, upto, this); };


  CF.argh = function argumentsHelper(h) {
    if (h === undefined) { return CF.argh.justThis; }
    return function () { return arguments[h]; };
  };
  CF.argh.justThis = function () { return this; };
  CF.argh.swap2 = function (fun) {
    return function (a, b) {
      var swap = b;
      b = a;
      a = swap;
      return fun.apply(this, arguments);
    };
  };


  CF.warpZero = function (num, add) {
    if (num !== +num) { return num; }
    if (num >= 0) { return num; }
    num += add;
    return (num >= 0 ? num : false);
  };


  CF.confine = function (num, min, max) {
    if (num !== +num) { return false; }
    if (min > max) { return false; }
    if (num < min) { return min; }
    if (num > max) { return max; }
    return num;
  };


  CF.validateBounds = function (num, min, max) {
    if (!isFin(num)) { return false; }
    if (num < min) { return false; }
    if (num > max) { return false; }
    return num;
  };


  PT.toString = function () {
    return '['.concat(this.constructor.name, ' ', this[0], '..', this[1],
      '/', this.len(), ']');
  };


  PT.bounds = function (from, upto) {
    if (arguments.length === 0) { return [ this[0], this[1] ]; }
    this[0] = from;
    this[1] = upto;
    return this;
  };


  PT.from = function (from) {
    if (arguments.length === 0) { return this[0]; }
    this[0] = from;
    return this;
  };


  PT.upto = function (upto) {
    if (arguments.length === 0) { return this[1]; }
    this[1] = upto;
    return this;
  };


  PT.list = (function listMethodFactory(oldList) {
    if ((typeof oldList) === 'number') { oldList = { length: oldList }; }
    if (!oldList) { oldList = false; }
    var listFunc = function (newList) {
      if (arguments.length === 0) { return oldList; }
      this.list = listMethodFactory(newList);
      return this;
    };
    return listFunc;
  }(Number.POSITIVE_INFINITY));


  PT.len = function () { return (+this.list().length || 0); };


  PT.trueMax = function (max) {
    if (max === undefined) { max = this.len() - 1; }
    if (max < 0) { max = false; }
    if (this[0] === true) { this[0] = max; }
    if (this[1] === true) { this[1] = max; }
    return this;
  };


  PT.warpZero = function (len) {
    if (len === undefined) { len = this.len(); }
    this[0] = CF.warpZero(this[0], len);
    this[1] = CF.warpZero(this[1], len);
    return this;
  };


  PT.modulo = function (len) {
    if (len === undefined) { len = this.len(); }
    if (len > 0) {
      if (isFin(this[0])) { this[0] %= len; }
      if (isFin(this[1])) { this[1] %= len; }
    } else {
      this[0] = this[1] = false;
    }
    return this.warpZero(len);
  };


  PT.translate = function (fromDist, lastDist) {
    if (lastDist === undefined) { lastDist = fromDist; }
    if (+fromDist && isFin(this[0])) { this[0] += fromDist; }
    if (+lastDist && isFin(this[1])) { this[1] += lastDist; }
    return this;
  };


  PT.confine = function (max) {
    if (max === undefined) { max = this.len() - 1; }
    this[0] = CF.confine(this[0], 0, max);
    this[1] = CF.confine(this[1], 0, max);
    return this;
  };


  PT.validateBounds = function (max) {
    if (max === undefined) { max = this.len() - 1; }
    this[0] = CF.validateBounds(this[0], 0, max);
    this[1] = CF.validateBounds(this[1], 0, max);
    return this;
  };


  PT.boundsIfValid = function (max) {
    if (max === undefined) { max = this.len() - 1; }
    if (CF.validateBounds(this[0], 0, max) === false) { return false; }
    if (CF.validateBounds(this[1], 0, max) === false) { return false; }
    return [ this[0], this[1] ];
  };


  PT.enumerate = function () {
    var crntIdx = this.boundsIfValid(), upto, indices = (crntIdx && []);
    if (!crntIdx) { return false; }
    upto = crntIdx[1];
    for (crntIdx = crntIdx[0]; crntIdx <= upto; crntIdx += 1) {
      indices[indices.length] = crntIdx;
    }
    return indices;
  };


  PT.map = function (iter) {
    var list = this.list(), crntIdx, upto, results;
    if (!list) { return false; }
    crntIdx = this.boundsIfValid();
    if (!crntIdx) { return false; }
    upto = crntIdx[1];
    results = [];
    for (crntIdx = crntIdx[0]; crntIdx <= upto; crntIdx += 1) {
      results[results.length] = iter.call(list, list[crntIdx], crntIdx);
    }
    return results;
  };





















  return CF;
}());
