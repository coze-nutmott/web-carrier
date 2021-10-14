module.exports = function ({ types: t }) {
  return {
    visitor: {
      ExpressionStatement(path) {
        if (t.isCallExpression(path.node.expression)) {
          if (t.isExpression(path.node.expression.callee)) {
            const callee = path.node.expression.callee.name;
            if (callee === 'pushLog' || callee === 'assert') {
              path.remove();
            }
          }
        }
      },
      IfStatement(path) {
        const test = path.node.test;
        if (t.isIdentifier(test)) {
          if (test.name === 'IS_DEBUG') {
            path.remove();
          }
        }
      },
    },
  };
};
