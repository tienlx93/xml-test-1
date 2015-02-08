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

        services.getTopForty = function(callback){
            $http({
                method: 'GET',
                url: BACK_END_URL + 'Search',
                params: {
                    'query': '',
                    'method': 'limit',
                    'limit': 40
                }
            })
                .success(function (data) {
                    callback(data);

                })
        };

        services.getArtist = function(name, callback){
            $http({
                method: 'GET',
                url: BACK_END_URL + 'Search',
                params: {
                    'query': name,
                    'method': 'artist'
                }
            })
                .success(function (data) {
                    callback(data);

                })
        };

        services.getTopPlaylist = function(callback){
            $http({
                method: 'GET',
                url: BACK_END_URL + 'PlaylistController',
                params: {
                    'action': 'getTopPlaylist',
                    'limit': 10
                }
            })
                .success(function (data) {
                    callback(data);

                });
        };

        services.getMyPlaylist = function(callback){
            $http({
                method: 'GET',
                url: BACK_END_URL + 'PlaylistController',
                params: {
                    'action': 'getUserPlaylist'
                }
            })
                .success(function (data) {
                    callback(data);

                });
        };

        services.getPlaylist = function(id, callback){
            $http({
                method: 'GET',
                url: BACK_END_URL + 'playlist/' + id + '.xml'
            }).success(function (data) {
                    callback(data.SongList.List.Song);
                });
        };
        services.removePlaylist = function(id, callback){
            $http({
                method: 'GET',
                url: BACK_END_URL + 'PlaylistController',
                params: {
                    'action': 'delete',
                    'id': id,
                    'email': AccountService.user.email
                }
            }).success(function (data) {
                    callback(data);
                });
        };

        services.playCount = function(id, callback){
            $http({
                method: 'GET',
                url: BACK_END_URL + 'CounterController',
                params: {
                    'action': 'Song',
                    'id': id
                }
            }).success(function (data) {
                    callback(data);
                });
        };

        services.playlistCount = function(id, callback){
            $http({
                method: 'GET',
                url: BACK_END_URL + 'CounterController',
                params: {
                    'action': 'Playlist',
                    'id': id
                }
            }).success(function (data) {
                    callback(data);
                });
        };

        return services;
    }]);