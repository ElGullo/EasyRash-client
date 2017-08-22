app.controller('AddEventController', function($scope, $window, $mdDialog, $mdToast, EventsService) {
    var ae = this;

    ae.eventChairs = [];
    ae.eventAcronym = "";
    ae.eventTitle = null;
    ae.eventDescription = null;
    ae.eventDate = null;

    ae.closeDialog = function() {
        $mdDialog.cancel();
    };
    ae.newEvent = function() {
        //server needs only mail
        for (var i = 0; i < ae.addEventChairs.length; i++) {
            ae.addEventChairs[i] = ae.addEventChairs[i].mail;
        }
        var reqData = {
            "conference": ae.addEventTitle,
            "chairs": ae.addEventChairs,
            "date": ae.addEventDate,
            "description": ae.addEventDescription
        };
        EventsService.addEvent(ae.addEventAcronym, reqData).then(function(res) {
            openToast($mdToast, "Event successfully added", "success");
            ae.closeDialog();
            $window.location.reload();

        }).catch(function(res) {
            openToast($mdToast, "Error on create new event", "error");
        });
    };
});
