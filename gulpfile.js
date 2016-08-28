const gulp = require("gulp");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const browserify = require("browserify");
const uglify = require("gulp-uglify");

const HTML_PATHS = ["./assets/html/**/*.html"];
const IMG_PATHS = ["./assets/images/*.jpg", "./data/images/*.{jpg,JPG}"];
const JS_PATHS = ["./assets/js/**/*.{js,jsx}"];
const SCSS_PATHS = ["./assets/scss/**/*.scss"];
const FONT_PATHS = ["./assets/fonts/**/*.ttf"];

gulp.task("copy-html", () =>
    gulp.src(HTML_PATHS).pipe(gulp.dest("./static"))
);

gulp.task("copy-images", () =>
    gulp.src(IMG_PATHS)
    .pipe(imagemin())
    .pipe(gulp.dest("./static/images"))
);

gulp.task("copy-fonts", () =>
    gulp.src(FONT_PATHS)
    .pipe(gulp.dest("./static/fonts"))
);

gulp.task("build-scss", () =>
    gulp.src(SCSS_PATHS)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./static/css"))
);

gulp.task("build-js", () =>
    browserify("./assets/js/bootstrap.js")
    .transform("babelify", {
        presets: ["es2015", "react", "stage-3"],
        plugins: ["transform-runtime"],
    })
    .bundle()
    // Pass desired output filename to vinyl-source-stream
    .pipe(source("bootstrap.js"))
    .pipe(buffer())
    .pipe(uglify())
    // Start piping stream to tasks!
    .pipe(gulp.dest("./static/js"))
);

gulp.task("build", ["build-scss", "copy-html", "copy-fonts", "copy-images", "build-js"]);

gulp.task("default", ["build"]);

gulp.task("watch", ["build"], () => {
    gulp.watch(SCSS_PATHS, ["build-scss"]);
    gulp.watch(HTML_PATHS, ["copy-html"]);
    gulp.watch(JS_PATHS, ["build-js"]);
});
