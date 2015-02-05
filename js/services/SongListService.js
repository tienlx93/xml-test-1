services.factory("SongListService", ['$http',
    function ($http) {
        var services = {};
        services.songList = [];
        services.currentSong = {};
        services.getCurrentSong = function () {
            for (var i = 0; i < services.songList.length; i++) {
                if (services.songList[i].id === services.currentSong.id) {
                    return i;
                }
            }
            return -1;
        };
        services.getSong = function (id) {
            for (var i = 0; i < services.songList.length; i++) {
                if (services.songList[i].id === id) {
                    return services.songList[i];
                }
            }
            return null;
        };
        services.saveList = function() {
            var list = [];
            for (var i = 0; i < services.songList.length; i++) {
                var id = services.songList[i].id;
                list.push(id);
            }
            $http({
                method: 'POST',
                url: BACK_END_URL + 'SavePlayList',
                params: {
                    'name': 'Last Playlist',
                    'email': 'tienlx@yourplaylist.tk',
                    'songList': list
                }
            })
                .success(function (data) {
                    if(data == "Error") {
                        console.log("error");
                    }
                })
        };
        return services;
    }]);