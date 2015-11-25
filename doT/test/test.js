window.Test = function (arenite) {
  return {
    runTest: function () {
      console.log(arenite.templates.apply('sample', 'sample'));
      arenite.templates.applyTo('sample', 'applyTo', document.getElementById('apply_to_example'));
      arenite.templates.append('sample', 'append', document.body);
    }
  };
};