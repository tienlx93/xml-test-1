services.factory("SongListService", [
    function () {
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
        return services;
    }]);