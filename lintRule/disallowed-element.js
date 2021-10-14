module.exports = {
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (DISALLOW_LIST.includes(node.name && node.name.name)) {
          context.report({
            node,
            message: `this element is not allowed`,
          });
        }
      },
    };
  },
};

const DISALLOW_LIST = []; // 허용 안하는 HTML 요소 이름을 넣는다. ex) button
