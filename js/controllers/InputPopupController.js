controllers.controller('InputPopupController', ['$scope', 'InputPopupService',
    function ($scope, InputPopupService) {
        $scope.input = {};
        $scope.input.popupText = "";

        $scope.editText = function (form) {
            var inputText = InputPopupService.popupText;
            if (form.$valid) {
                $("#input-text").blur();
                inputText = $scope.input.popupText;
                InputPopupService.text = inputText;
                InputPopupService.closePopup();
                $scope.input.popupText = "";
            }
        };

        $scope.closePopup = function (cancel) {
            $("#input-text").blur();
            $scope.input.popupText = "";
            InputPopupService.closePopup(cancel);
        };

    }]);
