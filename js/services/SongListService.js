services.factory("SongListService", ['$http', 'AccountService', 'ErrorService',
    function ($http, AccountService, ErrorService) {
        var songListService = {};
        songListService.songList = [];
        songListService.currentSong = {};
        songListService.getCurrentSong = function () {
            for (var i = 0; i < songListService.songList.length; i++) {
                if (songListService.songList[i].Id === songListService.currentSong.Id) {
                    return i;
                }
            }
            return -1;
        };
        songListService.getSong = function (Id) {
            for (var i = 0; i < songListService.songList.length; i++) {
                if (songListService.songList[i].Id === Id) {
                    return songListService.songList[i];
                }
            }
            return null;
        };
        songListService.saveList = function (name) {
            var list = [];
            for (var i = 0; i < songListService.songList.length; i++) {
                var Id = songListService.songList[i].Id;
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

        songListService.init = false;
        var getXMLPlaylist = function (id) {
            $http({
                method: 'GET',
                url: BACK_END_URL + 'playlist/' + id + '.xml'
            }).success(function (data) {
                    songListService.songList = data.SongList.List.Song;
                    songListService.init = true;
                    setTimeout(function () {
                        songListService.init = false;
                    }, 500);
                });
        };


        songListService.loadLastPlaylist = function () {
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


        return songListService;
    }]);