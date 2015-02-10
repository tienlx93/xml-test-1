controllers.controller('LoginController', ['$scope', 'AccountService',
    function ($scope, AccountService) {
        $scope.input = {};
        $scope.input.noAcc = false;
        $scope.error = AccountService.error;

        var a = false;
        $scope.change= function(){
            a = $scope.input.noAcc;
        };

        $scope.$watch(function () {
            return AccountService.error;
        }, function () {
            $scope.error = AccountService.error;
        });

        $scope.$watch(function () {
            return $scope.input.username + $scope.input.password + $scope.input.email + a;
        }, function () {
            AccountService.error = false;
        });

        $scope.editText = function (form) {
            var inputText = AccountService.popupText;
            if (form.$valid) {
                $("#input-text").blur();
                AccountService.loginAcc = $scope.input;
                AccountService.closePopup(false, !$scope.input.noAcc);

            }
        };

        $scope.closePopup = function (cancel) {
            $("#input-text").blur();
            $scope.input.username = "";
            $scope.input.password = "";
            $scope.input.email = "";
            AccountService.closePopup(cancel);
        };

    }]);
