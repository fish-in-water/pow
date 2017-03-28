module.exports = function (grunt) {
  grunt.initConfig({
    paths: {
      src: 'src',
      dist: 'dist'
    },
    clean: {
      dist: ['<%= paths.dist %>']
    },
    uglify: {
      options: {
        sourceMap: false
      },
      build: {
        files: {
          '<%= paths.dist %>/pow.chart.core.min.js': [
            '<%= paths.src %>/pow.chart.core.js'
          ],
          '<%= paths.dist %>/pow.chart.axis.min.js': [
            '<%= paths.src %>/pow.chart.axis.js'
          ],
          '<%= paths.dist %>/pow.chart.pie.min.js': [
            '<%= paths.src %>/pow.chart.pie.js'
          ],
          '<%= paths.dist %>/pow.chart.doughnut.min.js': [
            '<%= paths.src %>/pow.chart.doughnut.js'
          ],
          '<%= paths.dist %>/pow.chart.radar.min.js': [
            '<%= paths.src %>/pow.chart.radar.js'
          ],
          '<%= paths.dist %>/pow.chart.all-in-one.min.js': [
            '<%= paths.src %>/pow.chart.core.js',
            '<%= paths.src %>/pow.chart.axis.js',
            '<%= paths.src %>/pow.chart.pie.js',
            '<%= paths.src %>/pow.chart.doughnut.js',
            '<%= paths.src %>/pow.chart.radar.js'
          ]
        }
      }
    },
    watch: {
      files: '<%= paths.src %>/**/*.js',
      tasks: ['uglify']
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '<%= paths.src %>/**/*.js',
            './**/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: '.',
          open: false
        }
      }
    },
    convert: {
      options: {
        explicitArray: false
      },
      xml2json: {
        expand: true,
        cwd: './examples/data/xml',
        src: ['**/*.xml'],
        dest: './examples/data/json',
        ext: '.json'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-convert');

  grunt.registerTask('build', ['clean', 'uglify']);
  grunt.registerTask('serve', ['browserSync', 'watch']);
  grunt.registerTask('default', ['build']);
};
