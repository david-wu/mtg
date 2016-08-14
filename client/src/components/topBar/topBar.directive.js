angular.module('components')
    .directive('topBar', [
        '$state',
        TopBar
    ]);

function TopBar($state){

    function link(scope, element, attrs){

        _.extend(scope, {
            $state: $state,
            containsName: function(link){
                var re = link.match || new RegExp(link.sref, 'i');
                return re.test($state.current.name);
            }
        });
    }

    return {
        scope: {
            topBar: '=?',
        },
        templateUrl: 'components/topBar/topBar.tpl.html',
        link: link,
    };
}

