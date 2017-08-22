app.controller("FiltersController", function($mdDialog, filteredreviewer, paper, updateReviewerFilters, openShowAnnotation, getLabelStyle, truncateAnnotationText, getReviewerStatusIcon) {
    var fc = this;
    fc.paper = paper;
    fc.filteredreviewer = filteredreviewer;
    fc.updateReviewerFilters = updateReviewerFilters;
    fc.openShowAnnotation = openShowAnnotation;
    fc.truncateAnnotationText = truncateAnnotationText;
    fc.getLabelStyle = getLabelStyle;
    fc.getReviewerStatusIcon = getReviewerStatusIcon;
    
    fc.closeDialog = function() {
        $mdDialog.cancel();
    };
});
