/* global Arenite:true */
Arenite.Templates = function (arenite, doT) {
  var _templates = {};

  var _addText = function (name, text) {
    _templates[name] = doT.template(text);
  };

  var _add = function (urls, callback) {
    var templateLatch = arenite.async.latch(urls.length, function () {
      if (typeof callback === 'function') {
        callback();
      } else {
        arenite.bus.publish('templates-loaded');
      }
    }, "template loader");
    urls.forEach(function (url) {
      arenite.loader.loadResource(url, function (template) {
        var templateContainer = document.createElement('div');
        templateContainer.innerHTML = template.responseText;
        document.body.appendChild(templateContainer);
        var scriptTags = templateContainer.getElementsByTagName('script');
        for (var i = 0; i < scriptTags.length; i++) {
          _addText(scriptTags[i].id, scriptTags[i].innerHTML);
        }
        document.body.removeChild(templateContainer);
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
    return _templates[name](arg);
  };

  return {
    add: _add,
    addText: _addText,
    addCompiled: _addCompiled,
    apply: _apply
  };
};