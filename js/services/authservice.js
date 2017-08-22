/*AuthService allow to manage user authentication making request for login and signup*/
app.factory('AuthService', function($http) {
    return {
        login: function(mail, password) {
            return $http({
                url: erConfig.baseUrl + '/api/token',
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(mail + ":" + password)
                },
                method: 'GET'
            });
        },
        refreshToken: function(oldtoken) {
            return $http({
                url: erConfig.baseUrl + '/api/token',
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":")
                },
                method: 'GET'
            });
        },
        signup: function(mail, reqData) {
            return $http({
                url: erConfig.baseUrl + '/api/user/' + mail,
                data: reqData,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                method: 'PUT'
            });
        },
        sendPasswordRecovery: function(mail) {
            return $http({
                url: erConfig.baseUrl + '/api/user/' + mail + '/pwdrecovery',
                method: 'GET'
            });
        },
        changeForgottenPassword: function(userID, newToken, newPassword) {
            return $http({
                url: erConfig.baseUrl + '/api/user/' + userID,
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(newToken + ":"),
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                data: {
                    'password': newPassword
                },
                method: 'POST'
            });
        },
        resendConfirm: function(userID) {
            return $http({
                url: erConfig.baseUrl + '/api/confirmation/resend/' + userID,
                method: 'GET'
            });
        }
    }
});
