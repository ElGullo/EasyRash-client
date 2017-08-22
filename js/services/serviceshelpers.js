// helper function to quickly assign encrypted headers
var _authheader = function() {
    var token = _storage.get("token");
    return {
        'Authorization': 'Basic ' + _base64.encode(token + ":")
    };
}
