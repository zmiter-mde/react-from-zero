const gulp = require('gulp');
const war = require('gulp-war');
const zip = require('gulp-zip');
const del = require('del');
const argv = require('yargs').default({buildDir:'build'}).argv;
const DIST_FOLDER = 'dist';

gulp.task('default', ['package-war']);

gulp.task('package-war', () => {
    console.log('package-war, build location: ', argv.buildDir);
    return gulp.src(argv.buildDir + '/**/*')
        .pipe(gulp.dest(DIST_FOLDER + '/war/'))
        .pipe(war({
            welcome: 'index.html',
            displayName: 'posters-ui'
        }))
        .pipe(zip('posters-ui.war'))
        .pipe(gulp.dest(DIST_FOLDER + '/'));
});

gulp.task('clean', function (cb) {
    return del([
        argv.buildDir,
        DIST_FOLDER
    ], {
        force: true
    }, cb);
});



