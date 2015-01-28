#global module:false

module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    # Configuration to be run (and then tested)
    watch:
      stylesheets:
        files: "src/scss/**"
        tasks: "sass:dev"
      templates:
        files: "deploy/_themes/**"
        tasks: "simplereload"
      content:
        files: "deploy/_content/**"
        tasks: "simplereload"
      options:
        livereload: true

    sass:
      dev:
        options:
          outputStyle: "expanded"
          sourceComments: "normal"
        files:
          "assets/css-dist/style.css": "src/scss/style.scss"
      dist:
        options:
          outputStyle: "compressed"
        files:
          "assets/css-dist/style.css": "src/scss/style.scss"

    autoprefixer:
        options: { browsers: ['last 2 version', 'ie 8', 'ie 7'] }
        no_dest:
            src: "assets/css-dist/style.css" # globbing is also possible here

    csso:
      dist:
        files:
          "assets/css-dist/style.css": "assets/css-dist/style.css"

    clean:
      stylesheets: "assets/css-dist/*.css"

  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-sass"
  grunt.loadNpmTasks "grunt-autoprefixer"
  grunt.loadNpmTasks "grunt-csso"

  # Reload the active Chrome tab
  grunt.registerTask "reload", "reload Chrome on OS X", ->
  require("child_process").exec "osascript " + "-e 'tell application \"Google Chrome\" " + "to tell the active tab of its first window' " + "-e 'reload' " + "-e 'end tell'"

  # Clean dist/ and copy root-directory/
  # NOTE: this has to wipe out everything
  grunt.registerTask "root-canal", [ "clean:stylesheets" ]

  # Clean and compile stylesheets
  grunt.registerTask "stylesheets:dev", ["clean:stylesheets", "sass:dev", "autoprefixer"]
  grunt.registerTask "stylesheets:dist", ["clean:stylesheets", "sass:dist", "autoprefixer", "csso:dist"]

  # Production task
  grunt.registerTask "dev", [ "root-canal", "stylesheets:dev", "reload" ]
  grunt.registerTask "dist", [ "root-canal", "stylesheets:dist", "reload" ]
  grunt.registerTask "simplereload", [ "reload" ]

  # Default task
  grunt.registerTask "default", "dev"