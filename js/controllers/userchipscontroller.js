app.controller("UserChipsController", function(UsersService, filterFilter) {
    var vm = this;
    vm.selectedItem = null;
    vm.searchText = null;
    vm.selectedUsers = [];
    vm.transformChip = transformChip;
    vm.querySearchDeferred = querySearchDeferred;
    vm.users = []; // caching
    function transformChip(chip) {
        if (angular.isObject(chip)) {
            return chip;
        }
    }

    function querySearchDeferred(query) {
        if (vm.users.length > 0) {
            mydata = [];
            vm.users.map(function(el) {
                var canPush = true;
                for (var i = 0; i < vm.selectedUsers.length; i++) {
                    if (vm.selectedUsers[i].mail == el.mail) {
                        canPush = false;
                    }
                }
                if (canPush) {
                    mydata.push({
                        mail: el.mail,
                        family_name: el.family_name,
                        given_name: el.given_name
                    });
                }
            });
            data = filterFilter(mydata, query);
            return data;
        }
        else {
            return UsersService.getUsers().then(function(response) {
                if (query) {
                    mydata = [];
                    response.data.map(function(el) {
                        mydata.push({
                            mail: el.mail,
                            family_name: el.family_name,
                            given_name: el.given_name
                        });
                    });
                    vm.users = mydata;
                    data = filterFilter(mydata, query);
                    return data;
                }
                else {
                    return ([{
                        family_name: 'None',
                        given_name: 'None',
                        mail: 'None'
                    }]);
                }
            });
        }
    }
});
