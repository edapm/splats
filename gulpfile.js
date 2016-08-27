var gulp = require("gulp");
var sass = require("gulp-sass");

var SCSS_PATHS = ["./assets/scss/**/*.scss"];
var JS_PATHS = ["./assets/js/**/*.js"];

gulp.task("build-scss", function() {
    return gulp.src(SCSS_PATHS)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./static/css"));
});

gulp.task("build", ["build-scss"]);

gulp.task("default", ["build"]);

gulp.task("watch", ["build"], function() {
    gulp.watch(SCSS_PATHS, ["build-scss"]);
});
