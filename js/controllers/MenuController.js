/**
 * Created by tienl_000 on 28/01/15.
 */
controllers.controller('MenuController', ['$scope', '$location', 'SearchService', 'SongListService', 'AccountService', 'ErrorService',
    function ($scope, $location, SearchService, SongListService, AccountService, ErrorService) {
        $scope.searchText = "";
        $scope.result = [];
        $scope.show = false;
        AccountService.checkLogin(function () {
            $scope.user = AccountService.user;
            SongListService.loadLastPlaylist();
        });

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

        $scope.login = function () {
            AccountService.showPopup(function () {
                $scope.user = AccountService.user;
                if (SongListService.songList.length == 0) {
                    SongListService.loadLastPlaylist();
                }
            });
        };

        $scope.logout = function () {
            AccountService.logout(function () {
                $scope.user = AccountService.user;
                SongListService.songList = [];
                $location.path("main");
            });
        };

        $scope.search = function () {
            $scope.show = false;
            $location.path("search/" + $scope.searchText);
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