/* eslint-disable no-labels */
module.exports = function (grunt) {
  pkg: grunt.file.readJSON('package.json'),
    grunt.initConfig({
      jsdoc: {
        dist: {
          src: [
            './src/components/*',
            './src/database/*',
            './src/screens/*',
            './App.tsx',
          ],
          dest: './doc',
          options: {
            configure: './jsdoc.json',
          },
        },
      },
    });

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.registerTask('default', ['jsdoc']);
};
