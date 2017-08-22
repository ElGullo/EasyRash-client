app.controller("UserConfirmationController", function($scope, $mdToast, $window, $mdDialog, AuthService, usermail, context) {
    var uc = this;
    uc.mail = usermail;
    uc.context = context;

    uc.resendConfirmation = function() {
        uc.loading = true;
        AuthService.resendConfirm(uc.mail).then(function(res) {
            uc.loading = false;
            openToast($mdToast, "Confirmation email resent! Check your inbox!", "success");
        }).catch(function(res) {
            uc.loading = false;
            openToast($mdToast, "There has been an error resending your confirmation error. Try again!", "error");
        });
    };

    uc.openLoginModal = function() {
        $scope.$emit('openLoginModal');
    };

    uc.closeDialog = function() {
        $mdDialog.cancel();
    };
});
