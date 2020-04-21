const { watch, src, dest, series, parallel } = require('gulp');
//переименование файлов
const rename = require('gulp-rename'); // для переименовывания
const cssmin = require('gulp-cssmin'); // минификатор
const sass = require("gulp-sass"); // sass препроцессор для css
const plumber = require("gulp-plumber"); // для улучшения работа node stream
const concat = require('gulp-concat'); // соединение файлов
const autoprefixer = require('gulp-autoprefixer'); // для вендорных префиксов
const browsersync = require("browser-sync").create();


// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./build/"
        },
        port: 3000
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean assets
function clean() {
    return del(["./_site/assets/"]);
}


function getCSS(){
    // подтянуть несколько css файлов, сжать, переименовать, и положить в итоговый билд
    return src(['node_modules/slick-carousel/slick/slick.css', 'node_modules/slick-carousel/slick/slick-theme.css',
        'node_modules/magnific-popup/dist/magnific-popup.css', 'sass/*.sass'])
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
        cascade: false
        }))
        .pipe(rename({suffix:".min"}))
        .pipe(dest('build/'))
        .pipe(browsersync.stream());
}

// function copyCss(){
//     return src(['node_modules/slick-carousel/slick/slick.css', 'node_modules/slick-carousel/slick/slick-theme.css',
//         'node_modules/magnific-popup/dist/magnific-popup.css', 'style.css'])
//         .pipe(concat('style.css'))
//         .pipe(cssmin())
//         .pipe(rename({suffix: ".min"}))
//         .pipe(dest('build/'));
// }


function copyHtml(){
    return src('*.html')
        .pipe(dest('build/'));
}

function copyImages() {
    return src('*.jpeg')
        .pipe(dest('build/'))
}

function getJs(){
    return src(['node_modules/jquery/dist/jquery.js', 'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/slick-carousel/slick/slick.js', 'code.js' ])
        .pipe(concat('code.js'))
        // .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(dest('build/'))
        .pipe(browsersync.stream());
}

function getFonts() {
    return src('node_modules/slick-carousel/slick/fonts/*.*')
        .pipe(dest('build/fonts'));
}


//How copy one gif without function?
function getGif() {
    return src('node_modules/slick-carousel/slick/*.gif')
        .pipe(dest('build/'));
}

exports.build = series(copyHtml, getCSS, getJs, getFonts, getGif, copyImages);

exports.watch = parallel( browserSync, watchCss);

exports.default = function() {
    // You can use a single task
    // getReady()
    // watch('sass/*.sass', getCSS);
    watch('sass/*.sass', getCSS);

    // watch('dist/*.js', getJs);


    // Or a composed task
    // watch(['dist/*.js', '*.html'], series(copyHtml, copyCss, getJs));
  };

function watchCss() {
    watch('sass/*.sass', getCSS);
}

function watchFiles() {
    gulp.watch("./assets/scss/**/*", css);
    gulp.watch("./assets/js/**/*", gulp.series(scriptsLint, scripts));
    gulp.watch(
        [
            "./_includes/**/*",
            "./_layouts/**/*",
            "./_pages/**/*",
            "./_posts/**/*",
            "./_projects/**/*"
        ],
        gulp.series(jekyll, browserSyncReload)
    );
    gulp.watch("./assets/img/**/*", images);
}