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
      js:
        files: "src/javascripts/**"
        tasks: "javascript:dev"
      templates:
        files: "public_html/_themes/**"
        tasks: "simplereload"
      content:
        files: "public_html/_content/**"
        tasks: "simplereload"
      options:
        livereload: true

    sass:
      dev:
        options:
          outputStyle: "expanded"
          sourceComments: "normal"
        files:
          "public_html/assets/css-dist/style.css": "src/scss/style.scss"
      dist:
        options:
          outputStyle: "compressed"
        files:
          "public_html/assets/css-dist/style.css": "src/scss/style.scss"

    autoprefixer:
        options: { browsers: ['last 2 version', 'ie 8', 'ie 7'] }
        no_dest:
            src: "public_html/assets/css-dist/style.css" # globbing is also possible here

    csso:
      dist:
        files:
          "public_html/assets/css-dist/style.css": "deploy/public_html/assets/css-dist/style.css"

    concat:
      js:
        #first concatenate libraries, then our own JS
        src: ["src/javascripts/concat/*"]
        #put it in dist/
        dest: "public_html/assets/javascripts-dist/compiled.js"

    uglify:
      compiler:
        files:
          "public_html/assets/javascripts-dist/compiled.js": ["public_html/assets/javascripts-dist/compiled.js"]
      copier:
        files: [
          expand: true # Enable dynamic expansion.
          cwd: "src/javascripts/no-concat/"
          src: ["**.js"] # Actual pattern(s) to match.
          dest: "public_html/assets/javascripts-dist/" # Destination path prefix.
          ext: ".js" # Dest filepaths will have this extension.
        ]

      compilerbeautify:
      	files:
          "public_html/assets/javascripts-dist/compiled.js": ["public_html/assets/javascripts-dist/compiled.js"]
        options:
          beautify: true
      copierbeautify:
        files: [
          expand: true # Enable dynamic expansion.
          cwd: "src/javascripts/no-concat/"
          src: ["**.js"] # Actual pattern(s) to match.
          dest: "public_html/assets/javascripts-dist/" # Destination path prefix.
          ext: ".js" # Dest filepaths will have this extension.
        ]
        options:
          beautify: true

    clean:
      stylesheets: "public_html/assets/css-dist/*.css"
      javascript: "public_html/assets/javascripts-dist/*.js"

  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-sass"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-autoprefixer"
  grunt.loadNpmTasks "grunt-csso"

  # Reload the active Chrome tab
  grunt.registerTask "reload", "reload Chrome on OS X", ->
  require("child_process").exec "osascript " + "-e 'tell application \"Google Chrome\" " + "to tell the active tab of its first window' " + "-e 'reload' " + "-e 'end tell'"

  # Clean dist/ and copy root-directory/
  # NOTE: this has to wipe out everything
  grunt.registerTask "root-canal", [ "clean:javascript", "clean:stylesheets" ]

  # Clean, compile and concatenate JS
  grunt.registerTask "javascript:dev", [ "clean:javascript", "concat:js", "uglify:compilerbeautify", "uglify:copierbeautify" ]
  grunt.registerTask "javascript:dist", [ "clean:javascript", "concat:js", "uglify:compiler", "uglify:copier" ]

  # Clean and compile stylesheets
  grunt.registerTask "stylesheets:dev", ["clean:stylesheets", "sass:dev", "autoprefixer"]
  grunt.registerTask "stylesheets:dist", ["clean:stylesheets", "sass:dist", "autoprefixer", "csso:dist"]

  # Production task
  grunt.registerTask "dev", [ "root-canal", "javascript:dev", "stylesheets:dev", "reload" ]
  grunt.registerTask "dist", [ "root-canal", "javascript:dist", "stylesheets:dist", "reload" ]
  grunt.registerTask "simplereload", [ "reload" ]

  # Default task
  grunt.registerTask "default", "dev"