/*EventsService allow to manage events, with function getEvents() addEvent() ...*/
app.factory('EventsService', function($http) {
    return {
        getEvents: function() {
            return $http({
                url: erConfig.baseUrl + '/api/event',
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":")
                },
                method: 'GET'
            });
        },
        getEvent: function(eventID) {
            return $http({
                url: erConfig.baseUrl + '/api/event/' + eventID,
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":")
                },
                method: 'GET'
            });
        },
        finalizeEvent: function(eventID, data) {
            return $http({
                url: erConfig.baseUrl + '/api/event/' + eventID + "/finalize",
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":"),
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: data,
                method: 'POST'
            });
        },
        addEvent: function(eventID, data) {
            return $http({
                url: erConfig.baseUrl + '/api/event/' + eventID,
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":"),
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: data,
                method: 'PUT'
            });
        },
        modifyEvent: function(eventID, data) {
            return $http({
                url: erConfig.baseUrl + '/api/event/' + eventID,
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":"),
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: data,
                method: 'POST'
            });
        }
    }
});
