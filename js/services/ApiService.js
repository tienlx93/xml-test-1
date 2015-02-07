services.factory("Api", ['$http', 'AccountService',
    function ($http, AccountService) {
        var services = {};

        services.getTopSongs = function(callback){
            $http({
                method: 'GET',
                url: BACK_END_URL + 'Search',
                params: {
                    'query': '',
                    'method': 'limit',
                    'limit': 200
                }
            })
                .success(function (data) {
                    callback(data);

                })
        };

        return services;
    }]);