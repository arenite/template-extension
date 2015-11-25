/* global Arenite:true */
/* jshint evil:true */
Arenite.Templates = function (arenite, browser, react, reactDOM) {
  var _templates = {};

  var _addText = function (name, text) {
    _templates[name] = eval('(function(){var module={};' + browser.transform(text).code + ';return module.exports;})()');
  };

  var _add = function (urls, callback) {
    var templateLatch = arenite.async.latch(arenite.object.keys(urls).length, function () {
      if (typeof callback === 'function') {
        callback();
      } else {
        arenite.bus.publish('templates-loaded');
      }
    }, "template loader");
    arenite.object.forEach(urls, function (entry, name) {
      arenite.loader.loadResource(entry, function (template) {
        _addText(name, template.responseText);
        templateLatch.countDown();
      }, function (e) {
        window.console.error(e);
      });
    });
  };

  var _addCompiled = function (name, func) {
    _templates[name] = func;
  };

  var _apply = function (name, arg) {
    if (!_templates[name]) {
      throw "Unable to find template '" + name + "'";
    }
    return react.createElement(_templates[name], arg);
  };

  var _applyTo = function (name, arg, target) {
    reactDOM.render(_apply(name, arg), target);
  };

  var _append = function (name, arg, target) {
    var tmp = document.createElement('div');
    target.appendChild(tmp);
    reactDOM.render(_apply(name, arg), tmp);
  };

  return {
    add: _add,
    addText: _addText,
    addCompiled: _addCompiled,
    apply: _apply,
    applyTo: _applyTo,
    append: _append
  };
};