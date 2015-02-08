services.factory("SongListService", ['$http', 'AccountService', 'ErrorService',
    function ($http, AccountService, ErrorService) {
        var services = {};
        services.songList = [];
        services.currentSong = {};
        services.getCurrentSong = function () {
            for (var i = 0; i < services.songList.length; i++) {
                if (services.songList[i].Id === services.currentSong.Id) {
                    return i;
                }
            }
            return -1;
        };
        services.getSong = function (Id) {
            for (var i = 0; i < services.songList.length; i++) {
                if (services.songList[i].Id === Id) {
                    return services.songList[i];
                }
            }
            return null;
        };
        services.saveList = function (name) {
            var list = [];
            for (var i = 0; i < services.songList.length; i++) {
                var Id = services.songList[i].Id;
                list.push(Id);
            }
            $http({
                method: 'GET',
                url: BACK_END_URL + 'PlaylistController',
                params: {
                    'action': 'save',
                    'name': name,
                    'email': AccountService.user.email,
                    'username': AccountService.user.username,
                    'songList': list
                }
            })
                .success(function (data) {
                    if (data == "Error") {
                        console.log("error");
                        ErrorService.showError("Lưu thất bại");
                    } else {
                        ErrorService.showError("Lưu thành công");
                    }
                });
        };

        var getXMLPlaylist = function (id) {
            $http({
                method: 'GET',
                url: BACK_END_URL + 'playlist/' + id + '.xml'
            }).success(function (data) {
                    services.songList = data.SongList.List.Song;
                });
        };


        services.loadLastPlaylist = function () {
            $http({
                method: 'GET',
                url: BACK_END_URL + 'PlaylistController',
                params: {
                    'action': 'getLastPlaylist'
                }
            }).success(function (data) {
                    if (data.lastId) {
                        getXMLPlaylist(data.lastId);
                    }
                });

        };


        return services;
    }]);