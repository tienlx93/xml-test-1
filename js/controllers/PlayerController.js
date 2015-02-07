/**
 * Created by tienl_000 on 29/01/15.
 */
controllers.controller('PlayerController', ['$scope', '$http', 'SongListService', 'InputPopupService', 'AccountService',
    function ($scope, $http, SongListService, InputPopupService, AccountService) {
        $scope.song = {}; //song for music player
        $scope.currentSong = SongListService.currentSong; //song for playlist
        $scope.songList = SongListService.songList; //playlist

        $scope.$watch(function () {
            return SongListService.songList.length;
        }, function () {
            $scope.songList = SongListService.songList; //playlist
        });



        $scope.chooseSong = function (i) {
            playSong($scope.songList[i]);

        };

        $scope.nextSong = function () {
            $scope.$$phase || $scope.$apply();
            var repeat = $("#jp_container_1").hasClass("jp-state-looped");

            var i = SongListService.getCurrentSong();
            if (i + 1 < $scope.songList.length) {
                playSong($scope.songList[i + 1]);
            } else if (repeat) {
                playSong($scope.songList[0]);
            }


        };

        $scope.prevSong = function (i) {
            var i = SongListService.getCurrentSong();
            if (i - 1 === -1) {
                playSong($scope.songList[$scope.songList.length - 1]);
            } else {
                playSong($scope.songList[i - 1]);
            }
        };

        $scope.shuffle = function () {
            shuffle($scope.songList);
        };

        $scope.remove = function (i) {
            if (SongListService.getCurrentSong() == i) {
                $scope.nextSong();
            }
            $scope.songList.splice(i, 1);

            if ($scope.songList.length == 0) {
                songError();
            }
        };

        $scope.removeList = function () {
            SongListService.songList = [];
        };

        var doSaveList = function () {
            InputPopupService.showPopup();
            InputPopupService.success = function (data) {
                SongListService.saveList(data);
            };
        };

        $scope.saveList = function () {
            if (AccountService.user.email) {
                doSaveList();
            } else {
                if (!AccountService.user.username) {
                    AccountService.showPopup(function () {
                        doSaveList();
                    });
                }
            }

        };

        var playSong = function (song) {
            $scope.currentSong = song;
            SongListService.currentSong = song;
            /*if (song.error) {
             return;
             }*/
            $("#jquery_jplayer_1").on($.jPlayer.event.error, function (event) {
                switch (event.jPlayer.error.type) {
                    case $.jPlayer.error.URL:
                        //songError();
                        break;
                    case $.jPlayer.error.NO_SOLUTION:
                        break;
                }
            });
            var path = BACK_END_URL + "song/" + $scope.currentSong.Id + ".xml";
            $http.get(path).success(function (data) {
                $scope.song = data.Song;
                var source = JSON.parse(data.Song.Source);
                $scope.song.Source = source.data[0].source;
//                $("#jquery_jplayer_1").jPlayer("stop");
                $("#jquery_jplayer_1").jPlayer("setMedia", {
                    mp3: data.Song.Source
                });
                $("#jquery_jplayer_1").jPlayer("play");

            }).error(function () {
                    songError();
                });
        };


        var songError = function () {
            $("#jquery_jplayer_1").jPlayer("pause");
            $("#jquery_jplayer_1").jPlayer("setMedia", {

            });
            $scope.currentSong.error = true;
            $scope.song = {'AlbumArt': 'img/musicstore.png'}
            $scope.nextSong();
        }
    }]);

