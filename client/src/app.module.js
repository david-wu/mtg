angular.module('gulp.templateCache', []);

angular.module('app', [
    'gulp.templateCache',
    'lib',
    'ngSanitize',
    'ui.router',
    'components',
    'services',
    'views',
]);
