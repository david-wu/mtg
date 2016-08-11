angular.module('components')
    .directive('mdViewer', [
        '$timeout',
        'mdItCheckbox',
        'MarkdownIt',
        MdViewer
    ]);

function MdViewer($timeout, mdItCheckbox, MarkdownIt){

    function linkFunc($timeout, mdItCheckbox, scope, element, attrs){

        var mdi = new MarkdownIt({
            breaks: true
        });

        mdi.use(mdItCheckbox);

        var container = element;
        scope.$watch('note.content', function(content){
            if(!content){return;}
            container.html(mdi.render(content));
        })
    }

    return {
        scope: {
            note: '=?',
        },
        templateUrl: 'components/mdViewer/mdViewer.tpl.html',
        link: linkFunc.bind(null, $timeout, mdItCheckbox),
    };
}

