gulp = require('gulp')
coffee = require('gulp-coffee')
header = require('gulp-header')
gutil = require('gulp-util')

pkg = require('./bower.json')
banner = "/*! #{ pkg.name } #{ pkg.version } */\n"

gulp.task 'coffee', ->
  try
    gulp.src('./src/*')
      .pipe coffee()
      .on('error', gutil.log)
      .pipe(header(banner))
      .pipe(gulp.dest('./dist/'))
  catch e

gulp.task 'default', ->
  gulp.run 'coffee'

  gulp.watch './src/*.coffee', ->
    gulp.run 'coffee'
