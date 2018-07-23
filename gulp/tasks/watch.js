// import dependencies
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();
    
gulp.task('watch', function() {

    browserSync.init({
        notify: true,
        server: {
            baseDir: "app"  
            // automatically serves up a browser with our app (port 3000) and auto updates browser with any changes done to code
        }
    });

    watch('./app/index.html', function() {
        // dummy task for demo -->  gulp.start('html'); // this will keep watching file until we press ctrl+c
        browserSync.reload();
    });

    // look for change to any CSS file
    watch('./app/assets/styles/**/*.css', function() {
        // gulp.start('styles')
        gulp.start('cssInject');
        // (above...) this allows us to change our css and it automatically gets injected without refreshing page
    });
});


gulp.task('cssInject', ['styles'], function() {
    // (above...) 'cssInject task will run AFTER the 'styles' task has completed
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});
