var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean');

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return gulp.src('src/dist/*',{read: false})
	.pipe(clean())
});

gulp.task('js', ['clean'],function () {
  gulp.src(['src/**/app.js', 'src/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(sourcemaps.write())	
      .pipe(gulp.dest('./src/dist'))
})

gulp.task('watch', ['js'], function () {
  gulp.watch('src/**/*.js', ['js'])
})

gulp.task('default',['watch'], function() {
  gulp.src('src')
    .pipe(webserver({
      livereload: true,
     // directoryListing: true,
      open: true
    }));
})


