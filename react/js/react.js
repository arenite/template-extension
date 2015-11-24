/* global Arenite:true */
/* jshint evil:true */
Arenite.Templates = function (arenite, browser, react) {
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

  return {
    add: _add,
    addText: _addText,
    addCompiled: _addCompiled,
    apply: _apply
  };
};