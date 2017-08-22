app.controller('EventsController', function($scope, $rootScope, $window, $mdDialog, $mdToast, EventsService) {
    var ec = this;
    ec.eventNum = 0;
    ec.showAllEvents = false;
    $scope.filteredEvents = [];
    $scope.allEvents = [];
    $scope.loading = true;
    $scope.eventsQueryStatus = "Loading...";
    
    // check if the user token is expired
    $rootScope.$broadcast("forceLogOut");

    EventsService.getEvents().success(function(data) {
        // how many request we will do
        ec.eventNum = data.length;
        // make requests to filter the array
        ec.filterUserInEvent(data);
        $scope.eventsQueryStatus = "Available events: click here to search!";
    }).error(function(data) {
        $scope.loading = false;
        $scope.error = true;
        $scope.errorMessage = "Ops! There's some problem with the backend! Try again later!";
    });

    $scope.openShowEventModal = function(ev, easyrash_event) {
        $mdDialog.show({
            templateUrl: erConfig.templatePath + 'events/modals/showEvent.html',
            parent: angular.element(document.body),
            locals: {
                er_event: easyrash_event
            },
            targetEvent: ev,
            clickOutsideToClose: true,
            controller: "EventController",
            controllerAs: "eventCtrl"
        })
    };

   ec.openAddEventModal = function(ev) {
        $mdDialog.show({
            parent: angular.element(document.body),
            templateUrl: erConfig.templatePath + 'events/modals/addEvent.html',
            controller: "AddEventController",
            controllerAs: "addEventCtrl",
            /*locals: {
                paper: pa.paper,
            },*/
            clickOutsideToClose: true
        });
    };
    ec.closeDialog = function() {
        $mdDialog.cancel();
    };

    ec.filterUserInEvent = function(events) {
        if (ec.eventNum == 0) {
            // no events to begin with
            $scope.loading = false
        }
        events.forEach(function(event) {
            // request more info about the event
            EventsService.getEvent(event.acronym).success(function(eventdata) {
                var userID = _storage.mail();
                // check if the user has a role in that event
                if (eventdata.pc_members.indexOf(userID) !== -1 || eventdata.chairs.indexOf(userID) !== -1) {
                    $scope.filteredEvents.push(event);
                }
                $scope.allEvents.push(event);
                // one more request handled
                ec.eventNum--;
                if (ec.eventNum == 0) {
                    // all requests handled, loading completed
                    $scope.loading = false
                }
            }).error(function(data) {
                $scope.loading = false;
                $scope.error = true;
                $scope.errorMessage = "Ops! There's some problem with the backend! Try again later!";
            });
        });
    };
});
