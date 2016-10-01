/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var arraynge = require('arraynge'), list, rg,
  eq = require('assert').deepStrictEqual;

list = [ 'salad', 'ham', 'cheese', 'egg', 'bacon', 'tomato' ];
rg = arraynge(4, 8, list);
eq(rg.toString(),               '[Arraynge 4..8/6]');
eq(rg.confine().toString(),     '[Arraynge 4..5/6]');

rg = arraynge.withThisList.bind(list);
eq(rg(4, 8).toString(), '[Arraynge 4..8/6]');
eq(rg(4, 8).confine().bounds(), [4, 5]);
















console.log('+OK all tests passed.');
