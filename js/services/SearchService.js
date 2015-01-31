services.factory("SearchService", ['$http', '$location',
    function ($http, $location) {
        var services = {};
        services.requestSearch = function(text, callback){
            $http({
                method: 'GET',
                url: 'fake-api/data.json',
                params: {
                    'searchText': text
                }
            })
                .success(function (data) {
                    callback(data);

                }).
                error(function (data, status) {

                });
        };


        return services;
    }]);