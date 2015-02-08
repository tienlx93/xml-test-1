controllers.controller('MainController', ['$scope', '$filter', '$routeParams', 'SongListService', 'Api', 'SearchService', 'ErrorService',
    function ($scope, $filter, $routeParams, SongListService, Api, SearchService, ErrorService) {
        $scope.display = {};

        $scope.sortType = '';
        $scope.songs = [];
        var fullList = [];
        $scope.filteredSongs = [];
        $scope.sortType = '';

        //Begin pagination
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;
        $scope.numPages = function () {
            return 0;
        };

        $scope.$watch('currentPage + numPerPage + songs.length + sortType', function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage);
            var end = begin + $scope.numPerPage;

            $scope.filteredSongs = $scope.songs.slice(begin, end);
        });

        $scope.prevPage = function () {
            if ($scope.currentPage != 1) {
                $scope.currentPage--;
            }
        };

        $scope.nextPage = function () {
            if ($scope.currentPage != $scope.numPages()) {
                $scope.currentPage++;
            }
        };
        //End pagination

        //Begin Category
        $scope.cat = [];
        $scope.cat.push({
            'id': 0,
            'name': 'Tất cả',
            'data': ''
        });
        $scope.selectedCat = $scope.cat[0];
        $scope.selectCat = function (i) {
            $scope.selectedCat = $scope.cat[i];
        };
        var catList = [];

        // End Category

        //Begin Get songs
        var addToSongList = function (data) {
            fullList = $scope.songs = data;
            for (var i = 0; i < fullList.length; i++) {
                var category = fullList[i].category;
                var existed = false;
                for (var j = 0; j < catList.length; j++) {
                    if (catList[j] == category) {
                        existed = true;
                    }
                }
                if (!existed) {
                    catList.push(category);
                }
            }
            for (var i = 0; i < catList.length; i++) {
                $scope.cat.push({
                    'id': i + 1,
                    'name': catList[i].replace('&amp;', '&'),
                    'data': catList[i]
                });
            }
            $scope.numPages = function () {
                return Math.ceil($scope.songs.length / $scope.numPerPage);
            };
        };

        var url = window.location.hash;
        $scope.viewType = {};

        if(url.lastIndexOf("topsongs")>=0) {
            $scope.viewType.topSong = true;
            $scope.display.playlist = false;
            $scope.display.category = false;
            $scope.display.song = true;
            $scope.numPerPage = 20;
            Api.getTopForty(function (data) {
                addToSongList(data);
            });
            $scope.url = BACK_END_URL + "topsong.jsp";
            $scope.playList = function () {
                var pl = [];
                for (var i = 0; i < fullList.length; i ++){
                    pl.push({
                        'Id': fullList[i].id,
                        'Title': fullList[i].title,
                        'Artist': fullList[i].artist
                    });
                }
                SongListService.songList = pl;
            };

        } else {
            $scope.display.playlist = false;
            $scope.display.category = true;
            $scope.display.song = true;
            if (url.lastIndexOf("search") > 0) {
                $scope.viewType.search = true;
                var query = $routeParams.query;
                $scope.searchText = query;
                SearchService.requestFullSearch(query, function (data) {
                    addToSongList(data);
                });
            } else {
                $scope.viewType.main = true;
                Api.getTopSongs(function (data) {
                    addToSongList(data);
                });
            }
        }



        //Order
        $scope.sort = function (type) {
            if (type == "play") {
                $scope.sortType = "play";
                $scope.songs = $filter('orderBy')($scope.songs, '-playCount');
            } else {
                $scope.sortType = "title";
                $scope.songs = $filter('orderBy')($scope.songs, 'title');
            }
        };


        $scope.$watch('selectedCat.id', function () {
            if ($scope.selectedCat.data) {
                $scope.songs = [];
                for (var i = 0; i < fullList.length; i++) {
                    if (fullList[i].category == $scope.selectedCat.data) {
                        $scope.songs.push(fullList[i]);
                    }
                }
            } else {
                $scope.songs = fullList;
            }

        });

        $scope.$watch('songs.length', function () {
            $scope.currentPage = 1;
            $scope.sortType = "";
        });


        //Add to playlist DONE
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


        var getSong = function (i) {
            var result;
            for (var j = 0; j < $scope.songs.length; j++) {
                if ($scope.songs[j].id == i) {
                    result = $scope.songs[j];
                    break;
                }
            }
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
    }]);