window.Test = function (arenite, reactDom) {
  return {
    runTest: function () {
      reactDom.render(arenite.templates.apply('es5', {arg: 'es5Arg'}), document.getElementById('es5_example'));
      reactDom.render(arenite.templates.apply('es6', {arg: 'es6Arg'}), document.getElementById('es6_example'));
    }
  };
};