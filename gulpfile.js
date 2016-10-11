var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    print = require('gulp-print'),
    plugins = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    pkg = require('./package.json'),
    dirs = pkg['sg-nashville-configs'].directories,
    sass = require('gulp-sass'),
    shell = require('gulp-shell'),
    render = require('gulp-nunjucks-render'),
    data = require('gulp-data'),
    dynamicSort = function (property) {
        return function (obj1, obj2) {
            return obj1[property] > obj2[property] ? 1
                : obj1[property] < obj2[property] ? -1 : 0;
        }
    },
    dynamicSortMultiple = function () {
        /*
         * save the arguments object as it will be overwritten
         * note that arguments object is an array-like object
         * consisting of the names of the properties to sort by
         */
        var props = arguments;
        return function (obj1, obj2) {
            var i = 0, result = 0, numberOfProperties = props.length;
            /* try getting a different result from 0 (equal)
             * as long as we have extra properties to compare
             */
            while (result === 0 && i < numberOfProperties) {
                result = dynamicSort(props[i])(obj1, obj2);
                i++;
            }
            return result;
        }
    },
    getData = function () {
        return JSON.parse(fs.readFileSync('./src/data/sg-nashville.json', 'utf8'));;
    },
    config = getData(),
    browserSync = require('browser-sync').create();

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('clean', function (done) {
    require('del')([
        dirs.archive,
        dirs.dist
    ]).then(function () {
        done();
    });
});

gulp.task('copy', function () {
    gulp.src([
        // Copy all files
        dirs.src + '/**/*',
        dirs.src + '.htaccess',
        // Excluding:
        '!' + dirs.src + '/{index,gear,rev}.html',
        '!' + dirs.src + '/data',
        '!' + dirs.src + '/data/**/*',
        '!' + dirs.src + '/doc',
        '!' + dirs.src + '/doc/**/*',
        '!' + dirs.src + '/sass',
        '!' + dirs.src + '/sass/**/*',
        '!' + dirs.src + '/.editorconfig',
        '!' + dirs.src + '/*git*.*',
        '!' + dirs.src + '/browserconfig.xml',
        '!' + dirs.src + '/crossdomain.xml'
    ]).pipe(gulp.dest(dirs.dist))
});

gulp.task('copy-css', function () {
    gulp.src([
        // Copy all files
        dirs.src + '/css/*'
    ]).pipe(gulp.dest(dirs.dist + '/css/'))
});

gulp.task('copy-js', function () {
    gulp.src([
        // Copy all files
        dirs.src + '/js/*'
    ]).pipe(gulp.dest(dirs.dist + '/js/'))
});

gulp.task('git-revision', shell.task(config.data.gitRevision.commands));

gulp.task('lint:js', function () {
    return gulp.src([
        dirs.src + '/js/*.js'
    ]).pipe(plugins.jscs())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('render', function (done) {

    // Refresh the data
    config = getData();

    return gulp.src([dirs.src + '/*.html', '!' + dirs.src + '/{rev,404}.html'])
        .pipe(print(function(filepath) {
            return "\tRendering " + filepath;
        }))
        .pipe(data(function(){
            return config;
        }))
        .pipe(render())
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('sass', function () {
    return gulp.src([dirs.src + '/sass/**/*.scss', '!' + dirs.src + '/sass/**/_*.scss'])
        .pipe(print(function(filepath) {
            return "\tsassing " + filepath;
        }))
        .pipe(sass())
        .pipe(gulp.dest(dirs.src + '/css'))
});

gulp.task('build', function (done) {
    runSequence(
        ['clean', 'sass', 'git-revision'],
        'copy',
        'render',
        done);
});

gulp.task('serve', function () {

    browserSync.init({server: "./dist"});

    gulp.watch([dirs.src + "/*.html", dirs.src + "/data/**/*.json"], function(){
        runSequence('render');
    });

    gulp.watch([dirs.src + "/sass/**/*.scss"], function(){
        runSequence('sass', 'copy-css');
    });

    gulp.watch([dirs.src + "/js/**/*.js"], function(){
        runSequence('copy-js');
    });

    gulp.watch(["dist/*.html", dirs.src + "/css/**/*.css", dirs.src + '/js/*']).on('change', browserSync.reload);

});

gulp.task('deploy', function (done) {
    runSequence('git-revision', 'build', function () {
        console.log('Deploy complete.');
    });
});

gulp.task('default', function (done) {
    runSequence('build', 'serve', function () {
        console.log('Default task complete.');
    });
});