module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      js: {
        src: ['../javascripts/main.js'],
        dest: '../dist/app.js'
      },
      options: {
        transform: ["hbsfy"],
        browserifyOptions: {
          paths: [
            "./node_modules"
          ]
        }
      }
    },
    jshint: {
      options: {
        predef: ["document", "console","$","alert","define","jQuery","jquery.hideseek.min.js"],
        esnext: true,
        strict: "global",
        globals: { $:true, this:true},
        browserify: true,
        undef:true,
        reporter: require("jshint-stylish")
      },
      files: ["../javascripts/**/*.js"]
    },
    sass: {
      dist: {
        files: {
          "../css/main.css": "../sass/styles.scss"
        }
      }
    },
    connect: {
      server: {
        options: {
          base: '../',
          hostname: 'localhost',
          port: 8080,
          livereload:true,
          open: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      index: {
        files: ["../index.html"]
      },
      javascripts: {
        files: ["../javascripts/**/*.js"],
        tasks: ["jshint", "browserify"]
      },
      sass: {
        files: ["../sass/**/*.scss"],
        tasks: ["sass"]
      },
      hbs: {
        files: ['../template/**/*.hbs'],
        tasks: ["browserify"]
      }
    }
  });

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.registerTask("default",["jshint", "sass", "browserify", "connect","watch" ]);
};