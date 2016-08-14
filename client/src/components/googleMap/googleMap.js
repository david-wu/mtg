angular.module('components')
    .directive('googleMap', [
        '$timeout',
        '$q',
        'Geolocation',
        GoogleMap
    ]);

function GoogleMap($timeout, $q, Geolocation){

    function link(scope, element, attrs){

        _.defaults(scope, {
            addresses: []
        })

        _.extend(scope, {
            loadGoogleMapsLib: function(callbackName){
                if(window._tmp_loadMapScriptPromise){
                    return window._tmp_loadMapScriptPromise;
                }
                if(window.google){
                    return $q.resolve(window.google);
                }
                return window._tmp_loadMapScriptPromise = new Promise(function(resolve, reject){
                    window._tmp_loadMapScriptCallback = function(){
                        resolve(google);
                        delete window._tmp_loadMapScriptCallback;
                    };
                    var scriptEl = document.createElement('script');
                    scriptEl.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBlocsZcGKJBOmOvsxd_1KMoXAxs8tB4z8&callback=_tmp_loadMapScriptCallback';
                    document.body.appendChild(scriptEl);
                });
            },

            mountMaps: function(google){

                var options = {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 8,
                }
                var map = new google.maps.Map(element[0], options);
                $timeout(function(){
                    map.setCenter(new google.maps.LatLng(37.3, -121.9));
                },1000);

                // workaround for google map center bug
                $timeout(function(){
                    map.setCenter(new google.maps.LatLng(37.3, -121.9));
                },1000);


                var maxZoom = 12;
                var markers = [];


                scope.$watchCollection('addresses.children', function(){
                    clearMarkers();

                    _.each(scope.addresses.children, function(address){
                        var marker = new google.maps.Marker({
                            position: address.geometry.location,
                            map: map,
                        });
                        markers.push(marker);
                    });

                    setBounds();
                });

                function setBounds(){
                    if(!markers.length){return;}
                    var bounds = new google.maps.LatLngBounds();
                    _.each(markers, function(marker){
                        bounds.extend(marker.position);
                    });
                    map.fitBounds(bounds);
                    if (map.getZoom() > maxZoom){
                        map.setZoom(maxZoom);
                    }
                }

                function clearMarkers(){
                    _.each(markers, function(marker){
                        marker.setMap(null);
                    })
                    markers.length = 0;
                }

                Geolocation.getCurrentPosition()
                    .then(function(position){
                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        map.setCenter(latlng);
                    });

            }
        });

        scope.loadGoogleMapsLib()
            .then(scope.mountMaps);

    }




    return {
        scope: {
            addresses: '=?'
        },
        templateUrl: 'components/googleMap/googleMap.tpl.html',
        link: link,
    };
}

