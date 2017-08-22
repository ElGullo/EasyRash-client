app.controller('AddPaperController', function($scope, $rootScope, $window, $mdDialog, $mdToast, PaperService, event) {
    var ap = this;

    ap.addPaper = function() {
        //server needs only mail
        for (var i = 0; i < ap.addPaperAuthors.length; i++) {
            ap.addPaperAuthors[i] = ap.addPaperAuthors[i].mail;
        }
        
        var reqData = {
            "title": ap.addPaperTitle,
            "authors": ap.addPaperAuthors, 
            "event": event.acronym,
            "text": _base64.encode(ap.addPaperRash) 
        };
        
        PaperService.addPaper(ap.addPaperUrl, reqData).then(function(res) {
            openToast($mdToast, "Paper successfully added", "success");
            ap.closeDialog();
            $window.location.reload();

        }).catch(function(res) {
            openToast($mdToast, "Error on create new paper", "error");
        });
        
    };
    
    ap.closeDialog = function() {
        $mdDialog.cancel();
    };
});
