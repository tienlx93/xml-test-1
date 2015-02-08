services.factory("ErrorService", [function () {
    var error = {};
    error.showError = function(err){
        $('#error').removeClass('hidden');
        $('#error').html(err);
        setTimeout(function(){
            $('#error').addClass('hidden');
        },3000);
    };
    return error;
}]);