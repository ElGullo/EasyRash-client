app.controller('MasterController', function(UsersService) {
    var mc = this;
    mc.serverOnline = true;
    mc.checkServer = function(){
        // if we're logged in check with the server if it's up
        if (_storage.mail()!=undefined){
            UsersService.getUsers().then(function(data){
                mc.serverOnline = true;
            }).catch(function(data){
                mc.serverOnline = false;
            });
        }
    }
    mc.checkServer();
});
