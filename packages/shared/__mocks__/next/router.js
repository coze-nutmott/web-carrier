'use strict';

const router = jest.createMockFromModule('next/router');
let mockQuery = {};
router.__setMockQuery = query => (mockQuery = query);
router.useRouter = function () {
  return {
    query: mockQuery,
    replace: () => {},
    push: () => {},
  };
};

module.exports = router;
