angular.module('components')
    .directive('topBar', [
        '$state',
        TopBar
    ]);

function TopBar($state){

    function link(scope, element, attrs){
        scope.$state = $state;

        scope.containsName = function(link){
            var re = new RegExp(link.sref, 'i');
            return re.test($state.current.name);
        }
    }

    return {
        scope: {
            topBar: '=?',
        },
        templateUrl: 'components/topBar/topBar.tpl.html',
        link: link,
    };
}

