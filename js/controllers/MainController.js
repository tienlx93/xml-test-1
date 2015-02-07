controllers.controller('MainController', ['$scope', '$filter', 'SongListService', 'Api',
    function ($scope, $filter, SongListService, Api) {
        $scope.display = {};
        $scope.display.playlist = false;
        $scope.display.category = true;
        $scope.sortType = 'Title';
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

        $scope.$watch('currentPage + numPerPage + songs.length', function () {
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
        Api.getTopSongs(function (data) {
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
        });


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
        });



        //Add to playlist DONE
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


        var getSong = function (i) {
            var index = $scope.numPerPage * ($scope.currentPage - 1) + i;
            var result = $scope.songs[index];
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