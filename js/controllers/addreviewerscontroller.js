app.controller('AddReviewersController', function($scope, $mdDialog, $mdToast, paper, UsersService) {
    var arc = this
    arc.newReviewers = [];
    arc.oldReviewers = [];

    //load old reviewers
    paper.reviewers.forEach(function(usermail, index) {
        UsersService.getUser(usermail).success(function(userdata) {
            arc.oldReviewers.push(userdata);
        }).error(function(data) {
            openToast($mdToast, "Server error", "error");
        });
    });

    arc.addReviewers = function() {
        paper.reviewers = [];
        arc.newReviewers.forEach(function(rev, index) {
            paper.reviewers.push(arc.newReviewers[index]["mail"]);
        });
        paper.modified = true;
        arc.closeDialog();
    }

    arc.closeDialog = function() {
        $mdDialog.cancel();
    };
});
