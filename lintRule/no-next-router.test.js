require('./lib/testHelper.js').run({
  name: 'no-next-router',
  message: 'default import of "next/router" is not allowed',
  validList: [
    'import link from "next/link"',
    'import {abc} from "next/router"',
  ],
  invalidList: [
    'import router from "next/router"',
    'import router, {abc} from "next/router"',
  ],
});
