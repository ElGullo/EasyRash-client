app.controller('ChairDecisionController', function($scope, $mdDialog, $mdToast, paper) {
    var cdc = this
    cdc.finalDecision = paper.finalChairDecision

    cdc.saveDecision = function() {
        paper.finalChairDecision = cdc.finalDecision
        paper.modified = true;
        cdc.closeDialog()
    }

    cdc.closeDialog = function() {
        $mdDialog.cancel();
    };
});
