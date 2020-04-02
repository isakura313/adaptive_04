const { watch, src, dest, series } = require('gulp');
//переименование файлов
const rename = require('gulp-rename') // для переименовывания
const cssmin = require('gulp-cssmin'); // минификатор
const sass = require("gulp-sass") // sass препроцессор для css
const plumber = require("gulp-plumber") // для улучшения работа node stream
const concat = require('gulp-concat') // соединение файлов
const autoprefixer = require('gulp-autoprefixer'); // для вендорных префиксов



function getCSS(){
    // подтянуть несколько css файлов, сжать, переименовать, и положить в итоговый билд
    return src('sass/*.sass')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(rename({suffix:".min"}))
    .pipe(dest('css/'));
}






exports.default = function() {
    // You can use a single task
    // getReady()
    watch('sass/*.sass', getCSS);

    // watch('dist/*.js', getJs);


    // Or a composed task
    // watch(['dist/*.js', '*.html'], series(copyHtml, copyCss, getJs));
  };