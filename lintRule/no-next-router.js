module.exports = {
  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          node.source.value === 'next/router' &&
          node.specifiers?.some(item => item.type === 'ImportDefaultSpecifier')
        ) {
          context.report({
            node,
            message: 'default import of "next/router" is not allowed',
          });
        }
      },
    };
  },
};
