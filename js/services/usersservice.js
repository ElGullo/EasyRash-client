/*UsersService contains all function for manipulate users through API*/
app.factory('UsersService', function($http) {
    return {
        getUsers: function() {
            return $http({
                url: erConfig.baseUrl + '/api/user',
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":")
                },
                method: 'GET'
            })
        },
        getUser: function(userID) {
            return $http({
                url: erConfig.baseUrl + '/api/user/' + userID,
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":")
                },
                method: 'GET'
            })
        },
        changePassword: function(userID, oldPassword, newPassword) {
            return $http({
                url: erConfig.baseUrl + '/api/user/' + userID,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    //'Authorization': 'Basic ' + _base64.encode(userID + ":" + oldPassword)
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":")
                },
                data: {
                    'password': newPassword
                },
                method: 'POST'
            });
        },
        changeUserInfo: function(userID, data) {
            return $http({
                url: erConfig.baseUrl + '/api/user/' + userID,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":")
                },
                'data': data,
                method: 'POST'
            });
        }
    }
});
