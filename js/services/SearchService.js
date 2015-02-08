services.factory("SearchService", ['$http', '$location',
    function ($http, $location) {
        var services = {};
        services.requestSearch = function(text, callback){
            $http({
                method: 'GET',
                url: BACK_END_URL + 'Search',
                params: {
                    'query': text,
                    'method': 'quick'
                }
            })
                .success(function (data) {
                    callback(data);
                })
        };

        services.requestFullSearch = function(text, callback){
            $http({
                method: 'GET',
                url: BACK_END_URL + 'Search',
                params: {
                    'query': text,
                    'method': ''
                }
            })
                .success(function (data) {
                    callback(data);
                })
        };


        return services;
    }]);