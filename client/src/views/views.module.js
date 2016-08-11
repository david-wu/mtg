angular.module('views', [])
    .config(function($stateProvider, $urlRouterProvider){

        $stateProvider
            .state('noteViewPage', {
                url: '/noteViewPage',
                controller: 'NoteViewPage',
                templateUrl: 'views/noteViewPage/noteViewPage.tpl.html',
            });

        $stateProvider
            .state('profileViewer', {
                url: '/profileViewer',
                controller: 'ProfileViewer',
                templateUrl: 'views/profileViewer/profileViewer.tpl.html',
            });

        $stateProvider
            .state('mtg', {
                url: '/mtg',
                template: '<mtg-card-picker>'
            });

        $urlRouterProvider.otherwise('/mtg');

    });