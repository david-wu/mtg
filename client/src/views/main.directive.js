angular.module('views')
    .directive('main', [
        Main
    ]);

function Main(){

	function link(scope){

		_.extend(scope, {
			topBar: {
				logo: 'dawu',
				links: [
					{
						match: /mtg/i,
						sref: 'mtg.myCards',
						label: 'MTG',
					},
					{
						sref: 'noteViewPage',
						label: 'Notes',
					},
					{
						sref: 'profileViewer',
						label: 'Profile',
					},
				],
			},
		})

	}

    return {
        scope: {},
        templateUrl: 'views/main.tpl.html',
        link: link,
    };
}
