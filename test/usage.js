/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var arraynge = require('arraynge'), list, rg,
  eq = require('assert').deepStrictEqual;


rg = arraynge(4, 8);
eq(rg.toString(),   '[Arraynge 4..8/Infinity]');
eq(rg.list(),       { length: Number.POSITIVE_INFINITY });
eq(rg.confine(),    rg);
eq(rg.toString(),   '[Arraynge 4..8/Infinity]');

eq(arraynge(5, 9).enumerate(),    [ 5, 6, 7, 8, 9 ]);
eq(arraynge(5, -9).enumerate(),   false);
eq(arraynge(5, Infinity).enumerate(),    false);

function getArgs(a, b, c, d) { return { ctx: this, arg: [a, b, c, d] }; }
eq(arraynge(5, 7).map(getArgs),
  [ { ctx: { length: Infinity }, arg: [undefined, 5, undefined, undefined] },
    { ctx: { length: Infinity }, arg: [undefined, 6, undefined, undefined] },
    { ctx: { length: Infinity }, arg: [undefined, 7, undefined, undefined] },
    ]);


list = [ 'salad', 'ham', 'cheese', 'egg', 'bacon', 'tomato' ];
rg = arraynge(4, 8, list);
eq(rg.toString(),   '[Arraynge 4..8/6]');
eq(rg.list(),       list);
eq(rg.bounds(),     [4, 8]);
eq(rg.confine(),    rg);
eq(rg.toString(),   '[Arraynge 4..5/6]');


rg = arraynge(4, 8, list);
eq(rg.bounds(),         [4, 8]);
eq(rg.boundsIfValid(),  false);
eq(rg.bounds(),         [4, 8]);    // not changed by …IfValid
eq(rg.map(getArgs),     false);

rg = arraynge(4, 8, list).confine();
eq(rg.boundsIfValid(),  [4, 5]);
eq(rg.map(getArgs),
  [ { ctx: list, arg: ['bacon',   4, undefined, undefined] },
    { ctx: list, arg: ['tomato',  5, undefined, undefined] },
    ]);


rg = arraynge(-4, -3, list).confine();
eq(rg.boundsIfValid(),  [0, 0]);
eq(rg.map(getArgs),
  [ { ctx: list, arg: ['salad',   0, undefined, undefined] },
    ]);


rg = arraynge(-4, -3, list).warpZero().confine();
eq(rg.boundsIfValid(),  [2, 3]);
eq(rg.map(getArgs),
  [ { ctx: list, arg: ['cheese',  2, undefined, undefined] },
    { ctx: list, arg: ['egg',     3, undefined, undefined] },
    ]);


rg = arraynge(-6, -3, list).warpZero().confine();
eq(rg.boundsIfValid(),  [0, 3]);
rg = arraynge(-7, -3, list).warpZero().confine();
eq(rg.boundsIfValid(),  false);


rg = arraynge(4, 8, list).modulo();
eq(rg.boundsIfValid(),  [4, 2]);
eq(rg.map(getArgs),     []);


rg = arraynge.withThisList.bind(list);
eq(rg(4, 8).toString(), '[Arraynge 4..8/6]');
eq(rg(4, 8).bounds(), [4, 8]);
eq(rg(4, 8).confine().bounds(), [4, 5]);
eq(rg(4, 8).validateBounds().bounds(), [4, false]);

eq(rg(0, true).toString(),            '[Arraynge 0..true/6]');
eq(rg(0, true).trueMax().toString(),  '[Arraynge 0..5/6]');















console.log('+OK all tests passed.');
