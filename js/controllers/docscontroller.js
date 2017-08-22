app.controller('DocsController', function($http) {
    var dc = this;
    dc.api = [{
        apiname: null,
        api: []
    }];
    dc.lastApiIndex = 0;
    dc.lastApi = null;
    
    $http.get(erConfig.templatePath + '/api.json').then(function(data){
        dc.lastApi = dc.api[dc.lastApiIndex].apiname = data.data[0].api;
        data.data.forEach(function(api){
            if(dc.isNewApi(api.api)){
                dc.lastApiIndex++;
                dc.api.push({
                    apiname: api.api,
                    api: []
                });
            }
            dc.api[dc.lastApiIndex].api.push(api);    
        });       
    });
    
    dc.isNewApi = function(api){
        if(dc.lastApi!=api){
            dc.lastApi = api;
            return true;
        }
        return false;
    };
 
});
