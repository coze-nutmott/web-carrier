console.log('aaa');
if (IS_DEBUG) {
  console.log('adsf1');
  pushLog('asdf2');
}
if (true) {
  console.log('adsf1');
  pushLog('asdf2');
}
function add(a, b) {
  assert(a, 'a must be not undefined');
  return a + b;
}
