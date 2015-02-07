services.factory("InputPopupService", [function () {
    var popup = {};

    popup.show = false;

    popup.text = "";

    popup.success = function (data) {

    };

    popup.message = function (data) {
        popup.popupMessage = data;
    };

    popup.title = function (data) {
        popup.popupTitle = data;
    };

    popup.showPopup = function () {
        popup.show = true;
        $('.popup').removeClass("hidden");
        $('#input-popup').removeClass("hidden");
        $(".popup-text").focus();
    };

    popup.closePopup = function (cancel) {
        popup.show = false;
        $('.popup').addClass("hidden");
        $('#input-popup').addClass("hidden");
        if (!cancel) {
            popup.success(popup.text);
        }
    };
    return popup;
}]);