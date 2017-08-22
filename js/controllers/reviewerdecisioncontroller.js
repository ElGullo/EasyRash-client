app.controller('ReviewerDecisionController', function($scope, $mdDialog, $mdToast, paper) {
    var rdc = this
    rdc.finalDecision = paper.finalReviewerDecision

    rdc.saveDecision = function() {
        paper.finalReviewerDecision = rdc.finalDecision
        paper.modified = true;
        rdc.closeDialog()
    }
    rdc.closeDialog = function() {
        $mdDialog.cancel();
    };
});
