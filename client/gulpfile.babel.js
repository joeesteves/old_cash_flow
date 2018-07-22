import gulp from "gulp"
import browserify from "browserify"
import source from "vinyl-source-stream"
import jade from "gulp-jade"
import gutil from "gulp-util"
import livereload from "gulp-livereload"
import sass from "gulp-sass"

gulp.task('default', ['transpile', 'jade', 'sass'], () => {
  livereload.listen()
  gulp.watch("src/**/*", ['transpile'])
  gulp.watch('**/*.jade', ['jade'])
  gulp.watch("src/styles/*.scss",['sass'])
})

gulp.task('jade', () => {
  gulp.src('**/*.jade')
  .pipe(jade().on('error', gutil.log))
  .pipe(gulp.dest(''))
  .pipe(livereload())

})
gulp.task('sass', function() {
  gulp.src('src/styles/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist/styles'))
});

gulp.task("transpile", () => {
  return browserify("src/app.js")
    .transform("babelify")
    .bundle()
    .on("error", function(error){
      console.error( "\nError: ", error.message, "\n")
      this.emit("end")
    })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload())

})
