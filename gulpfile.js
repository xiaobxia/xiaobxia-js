/**
 * Created by xiaobxia on 2017/6/1.
 */
const gulp = require('gulp');
const del = require('del');
const gulpSequence = require('gulp-sequence');
const webpack = require('webpack-stream');
const srcPath = 'test';
gulp.task('compile-sass', function () {
    gulp.src('sass/xbx-core.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});
gulp.task('transform-js', function () {
    return gulp.src(srcPath+'/index.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(srcPath));
});

gulp.task('clean', function () {
    return del("dist");
});

gulp.task('build', gulpSequence('clean', ['transform-js', 'compile-sass'], ['minify-css', 'minify-js']));
