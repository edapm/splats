const gulp = require("gulp");
const sass = require("gulp-sass");
const exec = require("child_process").exec;
const imagemin = require("gulp-imagemin");

const HTML_PATHS = ["./assets/html/**/*.html"];
const IMG_PATHS = ["./assets/images/*.jpg", "./data/images/*.{jpg,JPG}"];
const JS_PATHS = ["./assets/js/**/*.{js,jsx}"];
const SCSS_PATHS = ["./assets/scss/**/*.scss"];

gulp.task("copy-html", () =>
    gulp.src(HTML_PATHS).pipe(gulp.dest("./static"))
);

gulp.task("copy-images", () =>
    gulp.src(IMG_PATHS)
    .pipe(imagemin())
    .pipe(gulp.dest("./static/images"))
);

gulp.task("build-scss", () =>
    gulp.src(SCSS_PATHS)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./static/css"))
);

const buildJSCommand = "browserify assets/js/bootstrap.js -t [ babelify --presets [ react es2015 stage-3 ] --plugins [ transform-runtime ] ] --debug -o static/js/bootstrap.js";

gulp.task("build-js", (cb) =>
    exec(buildJSCommand, cb)
);

gulp.task("build", ["build-scss", "copy-html", "copy-images", "build-js"]);

gulp.task("default", ["build"]);

gulp.task("watch", ["build"], () => {
    gulp.watch(SCSS_PATHS, ["build-scss"]);
    gulp.watch(HTML_PATHS, ["copy-html"]);
    gulp.watch(JS_PATHS, ["build-js"]);
});
