app.controller('FinalizeEventController', function($scope, $window, $mdToast, $mdDialog, EventsService, event, showFinalizeEvent) {
    var fe = this;
    
    fe.event = event;
    fe.acceptedPapers = [];
    fe.publisherEmail = "";
    event.submissions.forEach(function(paper){
        if (paper.state == "pso:accepted-for-publication"){
            fe.acceptedPapers.push(paper);
        }
    });

    fe.finalizeEvent = function() {
        var reqData = {"publisher_email" : fe.publisherEmail};
        EventsService.finalizeEvent(event.acronym, reqData).success(function(data){
            var reqData = {"state": "close"};
            EventsService.modifyEvent(event.acronym, reqData).success(function(res) {
                openToast($mdToast, "Paper finalized successfully!", "success");
                event.state = "close";
                showFinalizeEvent = false;
                fe.closeDialog();
            }).error(function(data) {
                openToast($mdToast, "Server error", "error");
            });
        }).error(function(data) {
            openToast($mdToast, "Server error", "error");
        });
    };
    
    fe.closeDialog = function() {
        $mdDialog.cancel();
    };
});
