controllers.controller('PlaylistController', ['$scope', 'Api', 'SongListService', 'ErrorService',
    function ($scope, Api, SongListService, ErrorService) {
        $scope.display = {};
        $scope.display.playlist = true;
        $scope.display.category = false;
        $scope.display.song = true;

        $scope.playlists = [];
        $scope.filteredSongs = [];

        var url = window.location.hash;

        var loadList = function() {
            if (url.lastIndexOf("myplaylist") >= 0) {
                $scope.myPlaylist = true;
                Api.getMyPlaylist(function (data) {
                    $scope.playlists = data;
                });
            } else {
                $scope.myPlaylist = false;
                Api.getTopPlaylist(function (data) {
                    $scope.playlists = data;
                });
            }
        };
        loadList();

        var playlist = [];

        var currentId = "";
        $scope.showDetail = function (id) {
            Api.getPlaylist(id, function (data) {
                currentId = id;
                playlist = data;
                $scope.filteredSongs = [];
                for (var i = 0; i < data.length; i++) {
                    $scope.filteredSongs.push({
                        'id': data[i].Id,
                        'title': data[i].Title,
                        'artist': data[i].Artist
                    });
                }
            });
        };

        $scope.playList = function () {
            SongListService.songList = playlist;
            Api.playlistCount(currentId, function(){
                console.log("Update success");
            });
        };

        $scope.addList = function () {
            Api.playlistCount(currentId, function(){
                console.log("Update success");
            });
            var duplicate = false;
            var songsToAdd = [];
            for (var i = 0; i < playlist.length; i++) {
                duplicate = false;
                for (var j = 0; j < SongListService.songList.length; j++) {
                    if (playlist[i].Id == SongListService.songList[j].Id) {
                        duplicate = true;
                    }
                }
                if (!duplicate) {
                    songsToAdd.push(playlist[i]);
                }
            }
            SongListService.songList = SongListService.songList.concat(songsToAdd);
        };

        $scope.addFirst = function (i) {
            var song = getSong(i);
            if (song && !SongListService.getSong(song.Id)) {
                SongListService.songList.splice(SongListService.getCurrentSong() + 1, 0, song);
            } else {
                ErrorService.showError("Bài hát đã có trong danh sách");
            }
        };

        $scope.addLast = function (i) {
            var song = getSong(i);
            if (song && !SongListService.getSong(song.Id)) {
                SongListService.songList.push(song);
            } else {
                ErrorService.showError("Bài hát đã có trong danh sách");
            }
        };

        $scope.removePlaylist = function(item) {
            var i = window.confirm("Bạn muốn xóa playlist " + item.name + "?");
            if (i) {
                Api.removePlaylist(item.id, function(data){
                    if (data == "Success"){
                        loadList();
                        ErrorService.showError("Xóa thành công");
                    } else {
                        ErrorService.showError("Xóa thất bại");
                    }
                });
            }
        };


        var getSong = function (i) {

            for (var j = 0; j < playlist.length; j++) {
                if (playlist[j].Id == i) {
                    return  playlist[j];
                }
            }

        };
    }]);
