angular.module('components')
    .factory('Column', [
        ColumnFactory
    ]);

function ColumnFactory(){

    function Column(options){
        _.extend(this, options);
    }

    Column.prototype = {

        clickHandler: function(){},

        class: function(){},

        html: function(){return ''},

    }

    return Column;
}

