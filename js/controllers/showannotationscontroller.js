app.controller('ShowAnnotationsController', function($sce, $scope, $mdDialog, $mdToast, paper, filteredreviewer, annotationsToShow, updateReviewerFilters, filterAnnotations, listAnnotations, mode) {
    var sac = this;
    sac.filteredAnnotationsToShow = [];

    // annotationsToShow sono le annotazioni aventi come id l'elemento cliccato
    // filtered sono le annotazioni da mostrare in base ai filtri

    annotationsToShow.forEach(function(val) {
        paper.filtered_comment_list.forEach(function(val2) {
            if (val2 == val) {
                var elem = document.querySelector(val.ref).cloneNode(true);
                //remove moreannotation icon number
                var moreAnn = elem.querySelectorAll(".moreAnnotations");
                if (moreAnn.length > 0) {
                    moreAnn.forEach(function(ann) {
                        ann.remove();
                    });
                }
                val["paper_fragment"] = elem.innerHTML;
                sac.filteredAnnotationsToShow.push(val);
            }
        });
    });

    sac.authorofit = function(author) {
        //controllo che l'autore dell'annotazione corrisponda o meno con l'utente loggato
        if ((author.substr(7) == _storage.mail()) && (mode == "Annotator")) return true;
        else return false;
    }

    sac.closeDialog = function() {
        $mdDialog.cancel();
    };

    sac.deleteAnnotation = function(index) {
        var ref = sac.filteredAnnotationsToShow[index].ref;
        var id = sac.filteredAnnotationsToShow[index]["@id"];
        var count_ref = 0;
        var annotation_to_delete = 0;
        var annotation_pos = 0;
        var jsonld = {};
        var author = sac.filteredAnnotationsToShow[index].author.substr(7);
        var differentAuthorsOnThisNote = false; // true if on this element there are notes from other authors
        for (var i = 0; i < paper.annotations_list.length; i++) {
            jsonld = JSON.parse(paper.annotations_list[i].innerText);
            for (var j = 0; j < jsonld.length; j++) {
                if (jsonld[j]["@type"] == "comment" && jsonld[j]['ref'] == ref) {
                    count_ref += 1;
                    if (jsonld[j]['author'].substr(7) != author) differentAuthorsOnThisNote = true;
                    if (jsonld[j]['@id'] == id) {
                        annotation_pos = i;
                        annotation_to_delete = j;
                    }
                }
            }
        }
        // get the right jsonl because the for loop changes it
        jsonld = JSON.parse(paper.annotations_list[annotation_pos].innerText);

        // delete the tag if its a span and i'm deleting the last comment on that span
        var elem = document.getElementById(ref.slice(1));
        var elemA = angular.element(elem);

        // delete the client classes and if needed the span element
        filteredreviewer.forEach(function(reviewer) {
            if (reviewer.id == author) {
                if (count_ref == 1 || differentAuthorsOnThisNote) elemA.removeClass(reviewer.className);
                elemA.removeClass(reviewer.classNameOn);
            }
        })
        if (count_ref == 1) {
            if (elem.tagName.toLowerCase() == "span") {
                elem.replaceWith(elem.textContent);
            }
            else {
                elemA.removeClass("er_note");
                if (elem.className.length == 0) elem.removeAttribute('class');
                if (elem.id.substring(0, 7) == "er_note") elem.removeAttribute('id');
                elem.onmouseover = null;
                elem.onmouseout = null;
                elem.onclick = null;
            }
        }
        updateReviewerFilters();

        // remove paper from annotation_list and update comment_list
        // we need to remove both the comment and its reference in the comment list
        // remove comment
        jsonld.splice(annotation_to_delete, 1);
        //remove reference
        jsonld.forEach(function(elem) {
            if (elem["@type"] == "review") {
                elem["comments"].splice(elem["comments"].indexOf(id), 1);
            }
        });
        // update data structures
        var savedscript = document.createElement("script");
        savedscript.type = "application/ld+json";
        savedscript.innerHTML = JSON.stringify(jsonld, null, 4);
        paper.annotations_list[annotation_pos] = savedscript;
        paper.comment_list = listAnnotations();
        paper.filtered_comment_list = filterAnnotations();
        updateReviewerFilters();
        paper.modified = true;
        openToast($mdToast, "Annotation successfully deleted!", "success");
        sac.closeDialog();
    }

    sac.editAnnotation = function(index) {
        var ref = sac.filteredAnnotationsToShow[index].ref;
        var id = sac.filteredAnnotationsToShow[index]["@id"];

        for (var i = 0; i < paper.annotations_list.length; i++) {
            var jsonld = JSON.parse(paper.annotations_list[i].innerText);
            for (var j = 0; j < jsonld.length; j++) {
                if (jsonld[j]["@type"] == "comment") {
                    if (jsonld[j]['ref'] == ref && jsonld[j]['@id'] == id) {
                        jsonld[j]['text'] = sac.filteredAnnotationsToShow[index]["text"];
                        var savedscript = document.createElement("script");
                        savedscript.type = "application/ld+json";
                        savedscript.innerHTML = JSON.stringify(jsonld, null, 4);
                        paper.annotations_list[i] = savedscript;
                        paper.modified = true;
                        openToast($mdToast, "Annotation successfully saved!", "success");
                        sac.closeDialog();
                    }
                }
            }
        }


    }
});
