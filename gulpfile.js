const gulp = require('gulp');
const war = require('gulp-war');
const zip = require('gulp-zip');
const del = require('del');
const argv = require('yargs').default({buildDir:'dist'}).argv;

gulp.task('build', ['package-war']);

gulp.task('package-war', ['copy-app'], () => {
    console.log('package-war, build location: ', argv.buildDir);
    return gulp.src(argv.buildDir + '/war/**/*')
        .pipe(war({
            welcome: 'index.html',
            displayName: 'posters-ui'
        }))
        .pipe(zip('posters-ui.war'))
        .pipe(gulp.dest(argv.buildDir + '/'));
});

gulp.task('copy-app', () => {
    console.log('copy-app');
    return gulp.src('dist/**/*')
        .pipe(gulp.dest(argv.buildDir + '/war/'))
});

gulp.task('clean', function (cb) {
    return del([
        argv.buildDir
    ], {
        force: true
    }, cb);
});



