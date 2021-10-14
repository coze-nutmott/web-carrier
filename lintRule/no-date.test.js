require('./lib/testHelper.js').run({
  name: 'no-date',
  message: 'new Date is not allowed',
  validList: [],
  invalidList: ['const d1 = new Date();', 'const d1 = new Date(123);'],
});
