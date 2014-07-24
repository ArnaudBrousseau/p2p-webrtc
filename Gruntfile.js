/*global module:false*/
module.exports = function (grunt) {
  'use strict';

  require('time-grunt')(grunt);

  var config = {
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*\n' +
      ' *  <%= pkg.name %> - v<%= pkg.version %>\n' +
      ' *  Release on: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? " *  " + pkg.homepage + "\\n" : "" %>' +
      ' *  Licensed <%= pkg.license %>\n' +
      ' */\n',
  };

  var path = require('path');

  require('load-grunt-config')(grunt, {
    init: true,
    configPath: path.join(process.cwd(), 'tasks'),
    config: config,
    data: config,
    jitGrunt: {
      simplemocha: 'grunt-simple-mocha',
      changelog: 'grunt-conventional-changelog'
    }
  });
};
