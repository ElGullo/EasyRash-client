app.controller("HeaderController", function($window, $mdDialog, $mdSidenav, $scope, $rootScope) {
    var hc = this;
    hc.isLogged = function() {
        return (_storage.mail()) ? true : false
    };
    hc.getCompleteName = function() {
        return _storage.get("given_name") + " " + _storage.get("family_name")
    };
    
    // Watch for changes in the sidenav condition
    var watchNavbar = null;
    
    hc.openSideNav = function() {
        watchNavbar = $rootScope.$watch(function(){return $mdSidenav('right-menu').isOpen();}, function(newvalue, oldvalue){
                if (oldvalue==true && newvalue==false){
                    // we're closing the SideNav with clickoutside
                    angular.element(document.querySelector("body")).css("overflow", "");
                    watchNavbar(); // disable the watchdog
                }
        });
        angular.element(document.querySelector("body")).css("overflow", "hidden");
        $mdSidenav('right-menu').open();
    };
    
    hc.closeSideNav = function() {
        angular.element(document.querySelector("body")).css("overflow", "");
        watchNavbar(); // disable the watchdog
        $mdSidenav('right-menu').close();
    }
    
    hc.openLoginModal = function() {
        $mdDialog.show({
            templateUrl: erConfig.templatePath + 'header/modals/login.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            controller: "AuthController"
        })
    };
    $scope.$on('openLoginModal', function() {
        hc.openLoginModal()
    }); // this ma be called from userconfirmationcontroller
    hc.openLoginModalFromSidenav = function() {
        $mdSidenav('right-menu').toggle();
        hc.openLoginModal();
    };
    hc.openUserModalFromSidenav = function(ev) {
        $mdSidenav('right-menu').toggle();
        hc.openUserModal(ev);
    };
    hc.openUserModal = function(ev) {
        $mdDialog.show({
            templateUrl: erConfig.templatePath + 'header/modals/user-panel.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            controller: "userPanelController"
        })
    };
});
