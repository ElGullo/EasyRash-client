// PaperService manage all paper related communication with the server
app.factory("PaperService", function($http) {
    return {
        getPapers: function() {
            return $http({
                url: erConfig.baseUrl + '/api/paper',
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":")
                },
                method: 'GET'
            })
        },
        getPaper: function(paperID) {
            return $http({
                url: erConfig.baseUrl + '/api/paper/' + paperID,
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":")
                },
                method: 'GET'
            })
        },
        addPaper: function(paperID, data) {
            return $http({
                url: erConfig.baseUrl + '/api/paper/' + paperID,
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":"),
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: data,
                method: 'PUT'
            })
        },
        modifyPaper: function(paperID, data) {
            return $http({
                url: erConfig.baseUrl + '/api/paper/' + paperID,
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":"),
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: data,
                method: 'POST'
            })
        },
        getPaperContent: function(paperID, type) { //type= html, pdf, ebook ecc
            return $http({
                url: erConfig.baseUrl + '/api/paper/' + paperID + '/' + type,
                headers: {
                    'Authorization': 'Basic ' + _base64.encode(_storage.get("token") + ":")
                },
                method: 'GET'
            })
        }
    }
});
