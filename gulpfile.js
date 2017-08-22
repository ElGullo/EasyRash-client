var gulp = require("gulp");
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var order = require('gulp-order');
var watch = require('gulp-watch');
var scopify = require('postcss-scopify');
var postcss = require('gulp-postcss');

//script paths
var jsFiles = 'js/**/!(easyrash|rash)*.js',
    jsDest = 'js';

//gulp js task
gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(order([
            "app.js",
            "services/*.js",
            "directives/*.js",
            "controller/*.js",
            "modules/*.js",
            "jquery.min.js",
            "bootstrap.min.js"
        ], {
            base: './js/'
        }))
        .pipe(concat('easyrash.js'))
        .pipe(gulp.dest(jsDest));
});

//gulp watch
gulp.task('watch', function() {
    gulp.watch('js/**/*.js', ["scripts"]);
});

//gulp css task
gulp.task('scopebootstrap', function() {
    var processors = [
        scopify('#rash-root')
    ];
    return gulp.src('css/rash/bootstrap.min.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('css'));
});

gulp.task('scoperash', function() {
    var processors = [
        scopify('#rash-root')
    ];
    return gulp.src('css/rash/rash.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('css'));
});

gulp.task('scopelncs', function() {
    var processors = [
        scopify('#rash-root')
    ];
    return gulp.src('css/rash/lncs.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('css'));
});

//set default gulp task 
gulp.task('build-er', ['scripts']);
gulp.task('build-scopes', ['scoperash','scopebootstrap','scopelncs' ]);
gulp.task('default', ['build-er']);
