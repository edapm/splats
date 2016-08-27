const gulp = require("gulp");
const sass = require("gulp-sass");

const SCSS_PATHS = ["./assets/scss/**/*.scss"];

gulp.task("build-scss", () => (
    gulp.src(SCSS_PATHS)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./static/css"))
));

gulp.task("build", ["build-scss"]);

gulp.task("default", ["build"]);

gulp.task("watch", ["build"], () => {
    gulp.watch(SCSS_PATHS, ["build-scss"]);
});
