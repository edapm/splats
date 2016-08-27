const gulp = require("gulp");
const sass = require("gulp-sass");

const HTML_PATHS = ["./assets/html/**/*.html"];
const IMG_PATHS = ["./assets/images/*.jpg", "./data/images/*.{jpg,JPG}"];
const SCSS_PATHS = ["./assets/scss/**/*.scss"];

gulp.task("copy-html", () =>
    gulp.src(HTML_PATHS).pipe(gulp.dest("./static"))
);

gulp.task("copy-images", () =>
    gulp.src(IMG_PATHS).pipe(gulp.dest("./static/images"))
);

gulp.task("build-scss", () =>
    gulp.src(SCSS_PATHS)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./static/css"))
);

gulp.task("build", ["build-scss", "copy-html", "copy-images"]);

gulp.task("default", ["build"]);

gulp.task("watch", ["build"], () => {
    gulp.watch(SCSS_PATHS, ["build-scss"]);
    gulp.watch(HTML_PATHS, ["copy-html"]);
});
