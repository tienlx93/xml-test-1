/**
 * Created by tienl_000 on 28/01/15.
 */
controllers.controller('MenuController', ['$scope', '$sce', 'SearchService', 'SongListService',
    function ($scope, $sce, SearchService, SongListService) {
        $scope.searchText = "";
        $scope.result = [];
        $scope.show = false;

        $scope.addFirst = function(i) {
            var song = getSong(i);
            if (song && !SongListService.getSong(song.id)) {
                SongListService.songList.splice(SongListService.getCurrentSong() + 1, 0, song);
            }
        };

        $scope.addLast = function(i) {
            var song = getSong(i);
            if (song && !SongListService.getSong(song.id)) {
                SongListService.songList.push(song);
            }
        };

        var getSong = function(i) {
            var result = $scope.result[i];
            if (!result) {
                return null;
            } else {
                var song = {
                    id:result.id,
                    title:result.title,
                    artist:result.subtitle
                };
                return song;
            }
        };
        var callback = function(data){
            var songs = [];
            var albums = [];
            var artists = [];
            for (var i = 0; i < data.length; i++) {
                switch (data[i].type) {
                    case "song":
                        songs.push(data[i]);
                        break;
                    case "artist":
                        artists.push(data[i]);
                        break;
                    case "album":
                        albums.push(data[i]);
                        break;
                }
            }
            $scope.result = data;
            $scope.songs = songs;
            $scope.albums = albums;
            $scope.artist = artists;
            $scope.$$phase || $scope.$apply();
        };

        $scope.$watch(function(){
            return $scope.searchText;
        },function(){
            if ($scope.searchText) {
                $scope.show = true;
                SearchService.requestSearch($scope.searchText, callback);
            } else {
                $scope.show = false;
            }
        });
    }]);