function returnFirstArgument(value) {
  return value;
}

returnFirstArgument(10);
returnFirstArgument('привет');

function sumWithDefaults(a, b = 100) {
  return a + b;
}

sumWithDefaults(10, 20);
sumWithDefaults(2, 4);
sumWithDefaults(10);

function returnFnResult(fn) {
  return fn();
}

returnFnResult(() => 'привет');

function returnCounter(number) {
  return function F(number) {
    return number + 1;
  };
}

const f = returnCounter(10);

console.log(f());
console.log(f());
console.log(f());
