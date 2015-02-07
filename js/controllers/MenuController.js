/**
 * Created by tienl_000 on 28/01/15.
 */
controllers.controller('MenuController', ['$scope', '$sce', 'SearchService', 'SongListService', 'AccountService',
    function ($scope, $sce, SearchService, SongListService, AccountService) {
        $scope.searchText = "";
        $scope.result = [];
        $scope.show = false;
        AccountService.checkLogin(function(){
            $scope.user = AccountService.user;
            SongListService.loadLastPlaylist();
        });

        $scope.addFirst = function (i) {
            var song = getSong(i);
            if (song && !SongListService.getSong(song.Id)) {
                SongListService.songList.splice(SongListService.getCurrentSong() + 1, 0, song);
            }
        };

        $scope.addLast = function (i) {
            var song = getSong(i);
            if (song && !SongListService.getSong(song.Id)) {
                SongListService.songList.push(song);
            }
        };

        $scope.login = function() {
            AccountService.showPopup(function(){
                $scope.user = AccountService.user;
                if (SongListService.songList.length == 0) {
                    SongListService.loadLastPlaylist();
                }
            });
        };

        var getSong = function (i) {
            var result = $scope.songs[i];
            if (!result) {
                return null;
            } else {
                return {
                    'Id': result.id,
                    'Title': result.title,
                    'Artist': result.artist
                };
            }
        };


        $scope.$watch(function () {
            return $scope.searchText;
        }, function () {
            if ($scope.searchText) {
                $scope.show = true;
                SearchService.requestSearch($scope.searchText, function (data) {
                    $scope.songs = data;
                });
            } else {
                $scope.show = false;
            }
        });
    }]);