'use strict';

var path = {
  build: {
    js: '../js/',
    css: '../css/',
    img: '../img/min/',
  },
  src: {
    js: 'js/main.js',
    style: 'css/jo-lk-star.scss',
    img: 'img/**/*.*',
  },
  watch: {
    js: 'js/**/*.js',
    css: 'css/**/*.scss',
    img: 'img/**/*.*',
  }
};

var gulp          = require('gulp'),  // подключаем Gulp
    plumber       = require('gulp-plumber'), // модуль для отслеживания ошибок
    rigger        = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
    sass          = require('gulp-sass'), // модуль для компиляции SASS (SCSS) в CSS
    autoprefixer  = require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
    cleanCSS      = require('gulp-clean-css'), // плагин для минимизации CSS
    uglify        = require('gulp-uglify'), // модуль для минимизации JavaScript
    imagemin      = require('gulp-imagemin'), // плагин для сжатия PNG, JPEG, GIF и SVG изображений
    rename        = require('gulp-rename');

// сбор стилей
gulp.task('css', function () {
  return gulp.src(path.src.style) // получим main.scss
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(sass()) // scss -> css
    .pipe(autoprefixer()) // добавим префиксы
    .pipe(gulp.dest(path.build.css))
    ;
});
gulp.task('css:build', function () {
  return gulp.src(path.src.style) // получим main.scss
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(sass()) // scss -> css
    .pipe(autoprefixer()) // добавим префиксы
    .pipe(cleanCSS()) // минимизируем CSS
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.build.css))
    ;
});

// сбор js
gulp.task('js', function () {
  return gulp.src(path.src.js) // получим файл js
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(rigger()) // импортируем все указанные файлы в js
    .pipe(gulp.dest(path.build.js))
    ;
});
gulp.task('js:build', function () {
  return gulp.src(path.src.js) // получим файл js
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(rigger()) // импортируем все указанные файлы в js
    .pipe(uglify()) // минимизируем js
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.build.js))
    ;
});

// ! Только SVG и GIF. Остальные картинки, просто копируются в папку.
// * для картинок jpg и png использовать --> https://imageoptim.com/online
// обработка картинок
gulp.task('images', function () {
  return gulp.src(path.src.img) // путь с исходниками картинок
    .pipe(imagemin([ // сжатие изображений
      imagemin.gifsicle({ interlaced: true }),
      imagemin.svgo({ plugins: [{ removeViewBox: false }] })
    ]))
    .pipe(gulp.dest(path.build.img)) // выгрузка готовых файлов
    ;
});

// сборка
// gulp.task('build', gulp.parallel( 'css:build', 'js:build', 'images' ));

// разработка
// gulp.task('dev:build', gulp.series( 'css', 'js', 'images' ));
gulp.task('dev:build', gulp.series( 'css' ));

// запуск задач при изменении файлов
gulp.task('dev:watch', function () {
  gulp.watch(path.watch.css, gulp.parallel('css'));
  // gulp.watch(path.watch.js, gulp.parallel('js'));
  // gulp.watch(path.watch.img, gulp.parallel('images'));
});

// задача по умолчанию
gulp.task('default', gulp.series( 'dev:build', 'dev:watch' ));
