(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory();
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.p2pWebrtc = factory();
  }

}(this, function () {
  'use strict';

  // code goes here
  var p2pWebrtc = function (options) {
    return options;
  };

  return p2pWebrtc;
}));
