app.controller('ShowPaperMetadataController', function($scope, $mdDialog, $mdToast, UsersService, paper, getStatusIcon, getReviewerStatusIcon) {
    var pm = this;

    pm.paper = paper;
    pm.getReviewerStatusIcon = getReviewerStatusIcon;
    pm.getStatusIcon = getStatusIcon;
    pm.ShowRawMetadata = false;
    pm.rev = [];
    pm.aut = [];

    pm.closeDialog = function() {
        $mdDialog.cancel();
    };

    pm.initAuthors = function() {
        pm.paper.data.authors.forEach(function(usermail, index) {
            UsersService.getUser(usermail).success(function(userdata) {
                pm.aut.push(userdata);
            }).error(function(data) {
                openToast($mdToast, "Server error", "error");
            });
        });
    };
    pm.initReviewers = function() {
        pm.paper.data.reviewers.forEach(function(usermail, index) {
            UsersService.getUser(usermail).success(function(userdata) {
                pm.rev.push(userdata);
            }).error(function(data) {
                openToast($mdToast, "Server error", "error");
            });
        });
    };

    pm.initReviewers();
    pm.initAuthors();
});
