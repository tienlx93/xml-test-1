/**
 * Created by tienl_000 on 29/01/15.
 */
controllers.controller('PlayerController', ['$scope', '$http', 'SongListService',
    function ($scope, $http, SongListService) {
        $scope.song = {}; //song for music player
        $scope.currentSong = SongListService.currentSong; //song for playlist
        $scope.songList = SongListService.songList; //playlist
        
        $scope.$watch(function(){
            return SongListService.songList.length;
        },function(){
            $scope.songList = SongListService.songList; //playlist
        });
        
        $http.get('fake-api/playlist.json').success(function (data) {
            $scope.songList = data;
            SongListService.songList = data;
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

        var playSong = function (song) {
            $scope.currentSong = song;
            SongListService.currentSong = song;
            if (song.error) {
                return;
            }
            $("#jquery_jplayer_1").on($.jPlayer.event.error, function (event) {
                switch (event.jPlayer.error.type) {
                    case $.jPlayer.error.URL:
                        songError();
                        break;
                    case $.jPlayer.error.NO_SOLUTION:
                        break;
                }
            });
            var path = "fake-api/" + $scope.currentSong.id + ".xml";
            $http.get(path).success(function (data) {
                $scope.song = data.Song;
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

