
angular.module('components')
    .directive('expand', [
        expand
    ]);

function expand(){

    function link(scope, element){

        _.extend(scope, {

            mask: element.find('> .grow-mask'),
            contentEl: element.find('> .grow-mask > .masked'),

            findMaskHeight: function(){
                if(!scope.miExpand){return 0;}
                return scope.contentEl.outerHeight() + scope.contentEl.offset().top - scope.mask.offset().top;
            },

            setMaskHeight: function(height){
                if(height === scope.maskHeight){return;}
                scope.maskHeight = height;
                scope.mask.css('height', height);
            },

            // Mask has no initial transition to prevent transitioning to the first position
            initTransitionTimeout: setTimeout(function(){
                scope.mask.css('transition', 'height 0.15s linear');
            }, 200),

            heightCheckInterval: setInterval(function(){
                scope.setMaskHeight(scope.findMaskHeight());
            }, 100)

        });

        scope.$watch('miExpand', function(){
            scope.setMaskHeight(scope.findMaskHeight());
        });

        scope.$on('$destroy', function(){
            clearTimeout(scope.initTransitionTimeout);
            clearInterval(scope.heightCheckInterval);
        });

    }

    return {
        restrict: 'A',
        scope: {
            expand: '=?'
        },
        transclude: true,
        templateUrl: 'components/expand/expand.tpl.html',
        link: link
    };
}
