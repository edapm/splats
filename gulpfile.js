const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')
const uglify = require('gulp-uglify')

const HTML_PATHS = ['./assets/html/**/*.html']
const IMG_PATHS = ['./assets/images/*.jpg', './data/images/*']
const JS_PATHS = ['./assets/js/**/*.{js,jsx}']
const FONT_PATHS = ['./assets/fonts/**/*.ttf']

gulp.task('copy-html', () => gulp.src(HTML_PATHS).pipe(gulp.dest('./static')))

gulp.task('copy-images', () =>
    gulp.src(IMG_PATHS).pipe(imagemin()).pipe(gulp.dest('./static/images'))
)

gulp.task('copy-fonts', () =>
    gulp.src(FONT_PATHS).pipe(gulp.dest('./static/fonts'))
)

gulp.task('build-js', () =>
    browserify('./assets/js/bootstrap.js')
        .transform('babelify')
        .bundle()
        // Pass desired output filename to vinyl-source-stream
        .pipe(source('bootstrap.js'))
        .pipe(buffer())
        .pipe(uglify())
        // Start piping stream to tasks!
        .pipe(gulp.dest('./static/js'))
)

gulp.task('build', ['copy-html', 'copy-fonts', 'copy-images', 'build-js'])

gulp.task('default', ['build'])

gulp.task('watch', ['build'], () => {
    gulp.watch(HTML_PATHS, ['copy-html'])
    gulp.watch(JS_PATHS, ['build-js'])
})
