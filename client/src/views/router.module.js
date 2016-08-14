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
                template: '<mtg>'
            })
                .state('mtg.myCards', {
                    url: '/myCards',
                    template: '<card-group-page>',
                })
                .state('mtg.myStore', {
                    url: '/myStore',
                    template: '<card-group-page>',
                })
                .state('mtg.wishlist', {
                    url: '/wishlist',
                    template: '<card-group-page>',
                })

        $urlRouterProvider.when(/mtg/i, '/mtg/myCards');
        $urlRouterProvider.otherwise('/mtg');

    });