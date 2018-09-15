(function (module) {
    mifosX.controllers = _.extend(module, {
        LeaveManagementController: function (scope, resourceFactory, location) {
            scope.leavesmanagementdetails = [];
            scope.actualClients = [];
            scope.searchText = "";
            scope.searchResults = [];
            scope.routeTo = function (id) {
                location.path('/viewleavemanagementdetails/' + id);
            };

            scope.recordPerPage = 15;

            scope.getResultsPage = function (pageNumber) {
                var items = resourceFactory.leaveManagementSaveResource.getAllleaveDetails({
                    offset: ((pageNumber - 1) * scope.recordPerPage),
                    limit: scope.recordPerPage
                }, function (data) {
                    scope.leavesmanagementdetails = data.pageItems;
                });
            }

            scope.initPage = function () {

                var items = resourceFactory.leaveManagementSaveResource.getAllleaveDetails({
                    offset: 0,
                    limit: 15
                }, function (data) {
                    scope.totalrecords = data.totalFilteredRecords;
                    scope.leavesmanagementdetails = data.pageItems;
                });
            }
            scope.initPage();
            scope.filterText = scope.searchCriteria.centers || '';

            scope.onFilter = function () {
                scope.searchCriteria.leavesmanagementdetails = scope.filterText;
                scope.saveSC();
            };

        }
    });



    mifosX.ng.application.controller('LeaveManagementController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.LeaveManagementController]).run(function ($log) {
        $log.info("LeaveManagementController initialized");
    });
}(mifosX.controllers || {}));