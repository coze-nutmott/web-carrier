module.exports = {
  create(context) {
    return {
      NewExpression(node) {
        if (node.callee.name === 'Date') {
          context.report({
            node,
            message: 'new Date is not allowed',
          });
        }
      },
    };
  },
};
