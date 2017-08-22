app.controller('EditEventController', function($scope, $rootScope, $window, $mdToast, $mdDialog, $routeParams, EventsService, UsersService, event) {
    var ee = this;
    ee.newChairs = [];
    ee.oldChairs = [];
    // ee.eventdata is the model
    ee.eventdata = event;
    //date needs to be a Date Object
    ee.eventdata.date = new Date(ee.eventdata.date);
    //load old chairs
    ee.eventdata.chairs.forEach(function(usermail, index) {
        UsersService.getUser(usermail).success(function(userdata) {
            if (ee.eventdata.chairs[index]["mail"] != _storage.mail()) {
                ee.oldChairs.push(userdata);
            }
        }).error(function(data) {
            openToast($mdToast, "Server error", "error");
        });
    });

    ee.editEvent = function() {
        ee.eventdata.chairs = [];
        ee.newChairs.forEach(function(chair, index) {
            ee.eventdata.chairs.push(ee.newChairs[index]["mail"]);
        })
        var reqData = {
            "conference": ee.eventdata["conference"],
            "description": ee.eventdata["description"],
            "date": ee.eventdata["date"],
            "chairs": ee.eventdata["chairs"]
        }
  
        EventsService.modifyEvent(event.acronym, reqData).then(function(res) {
            openToast($mdToast, "Event correctly saved!", "success");
        }).catch(function(res) {
        
            openToast($mdToast, "Error while saving event", "error");
        });
        ee.closeDialog();
    };

    ee.closeDialog = function() {
        $mdDialog.cancel();
    };
});
