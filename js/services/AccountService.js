services.factory("AccountService", ['$http', '$location', 'InputPopupService',
    function ($http, $location) {
        var account = {};
        account.user = {};
        account.user.username = "";
        account.user.email = "";

        account.checkLogin = function (cb) {
            $http({
                method: 'GET',
                url: BACK_END_URL + 'AccountController',
                params: {
                    'action': 'Login'
                }
            }).success(function (data) {
                    if (data) {
                        account.user.username = data.username;
                        account.user.email = data.email;
                    }
                    cb();
                });
        };

        account.logout = function (cb) {
            $http({
                method: 'GET',
                url: BACK_END_URL + 'AccountController',
                params: {
                    'action': 'Logout'
                }
            }).success(function () {
                    account.user = {};
                    cb();
                });
        };


        var login = function (user, callback) {
            $http({
                method: 'GET',
                url: BACK_END_URL + 'AccountController',
                params: {
                    'action': 'Login',
                    'email': user.email,
                    'password': user.password
                }
            })
                .success(function (data) {
                    if (data.username) {
                        account.user.username = data.username;
                        account.user.email = data.email;
                    }
                    callback();
                });
        };

        var register = function (user, callback) {
            $http({
                method: 'GET',
                url: BACK_END_URL + 'AccountController',
                params: {
                    'action': 'Register',
                    'email': user.email,
                    'password': user.password,
                    'username': user.username
                }
            })
                .success(function (data) {
                    if (data.username) {
                        account.user.username = data.username;
                        account.user.email = data.email;
                    }
                    callback();

                })
        };

        account.loginAcc = {};

        var cb = function () {
        };

        account.error = false;

        account.showPopup = function (callback) {
            $('.popup').removeClass("hidden");
            $('#login-popup').removeClass("hidden");
            $("#email").focus();
            cb = function () {
                if (account.user.username) {
                    $('.popup').addClass("hidden");
                    $('#login-popup').addClass("hidden");
                    callback();
                } else {
                    account.error = true;
                }
            }
        };

        account.closePopup = function (cancel, isLogin) {

            if (!cancel) {
                if (isLogin) {
                    login(account.loginAcc, cb);
                } else {
                    register(account.loginAcc, cb);
                }
            } else {
                account.error = false;
                $('.popup').addClass("hidden");
                $('#login-popup').addClass("hidden");
            }
            account.loginAcc = {};
        };

        return account;
    }]);