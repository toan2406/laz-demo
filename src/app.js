import { thunk, stream } from 'laz/macro';
import Thunk from 'laz/helpers/Thunk';
import Stream from 'laz/helpers/Stream';
import { flow } from 'lodash/fp';

const multiplyBy10 = a => a * 10;

const lazy1 = thunk(
  // 1 has not been evaluated yet
  // use IIFE here to log when 1 is evaluated
  (() => {
    console.log('Evaluate 1');
    return 1;
  })(),
);

const lazyResult = Thunk.lift(multiplyBy10)(lazy1);

console.log('Done processing data');

// 1 is evaluated at this time
console.log(Thunk.eval(lazyResult));

// The log will be:
// Done processing data
// Evaluate 1
// 10

const s1 = stream([
  (() => {
    console.log('Evaluate 1');
    return 1;
  })(),
  (() => {
    console.log('Evaluate 2');
    return 2;
  })(),
  (() => {
    console.log('Evaluate 3');
    return 3;
  })(),
  (() => {
    console.log('Evaluate 4');
    return 4;
  })(),
]);

flow(
  Stream.map(a => a * 10),
  Stream.take(2),
  Stream.toArray,
  console.log,
)(s1);
