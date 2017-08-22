// LockService manages lock related communication with the server
app.factory("LockService", function($http) {
    return {
        getLockEspiration: function(paperID) {
            return $http({
                url: erConfig.baseUrl + '/api/paper/' + paperID + '/lock',
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":"),
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                method: 'GET'
            })
        },
        getLock: function(paperID) {
            return $http({
                url: erConfig.baseUrl + '/api/paper/' + paperID + '/lock',
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":"),
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    'lock_action': 'get'
                },
                method: 'POST'
            })
        },
        releaseLock: function(paperID) {
            return $http({
                url: erConfig.baseUrl + '/api/paper/' + paperID + '/lock',
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":"),
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    'lock_action': 'release'
                },
                method: 'POST'
            })
        }
    }
});
