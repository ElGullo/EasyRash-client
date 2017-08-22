/* AngularJS lets you extend HTML with new attributes called Directives.
 *The restrict option is typically set to:

 'A' - only matches attribute name <div header> </div>
 'E' - only matches element name <header></header>
 'C' - only matches class name
 'M' - only matches comment
 * */
app.directive("erheader", function() {
    return {
        restrict: 'E',
        templateUrl: erConfig.templatePath + 'header/index.html',
        controller: 'HeaderController',
        controllerAs: 'headerCtrl'
    };
});
app.directive("servernotfound", function() {
    return {
        restrict: 'E',
        templateUrl: erConfig.templatePath + '404/index.html'
    };
});
app.directive("erfooter", function() {
    return {
        restrict: 'E',
        templateUrl: erConfig.templatePath + 'footer/index.html'
    };
});

app.directive("filterannotations", function() {
    return {
        restrict: 'E',
        templateUrl: erConfig.templatePath + 'paper/modals/filterAnnotations.html'
    };
});
