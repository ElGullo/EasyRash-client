/*
 *Copyright (C) 2016 Carlo De Pieri, Alessio Koci, Gianmaria Pedrini,
 *Alessio Trivisonno
 *
 *This file is part of EasyRash.
 *
 *EasyRash is free software: you can redistribute it and/or modify
 *it under the terms of the GNU General Public License as published by
 *the Free Software Foundation, either version 3 of the License, or
 *(at your option) any later version.
 *
 *EasyRash is distributed in the hope that it will be useful,
 *but WITHOUT ANY WARRANTY; without even the implied warranty of
 *MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *GNU General Public License for more details.
 *
 *You should have received a copy of the GNU General Public License
 *along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

app.controller('ChairDecisionController', function($scope, $mdDialog, $mdToast, paper) {
    var cdc = this
    cdc.finalDecision = paper.finalChairDecision

    cdc.saveDecision = function() {
        paper.finalChairDecision = cdc.finalDecision
        paper.modified = true;
        cdc.closeDialog()
    }

    cdc.closeDialog = function() {
        $mdDialog.cancel();
    };
});
