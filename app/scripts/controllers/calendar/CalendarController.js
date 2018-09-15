(function (module) {
    mifosX.controllers = _.extend(module, {
        CalendarController: function (scope, resourceFactory, location) {
            scope.calendars = [];
            scope.actualClients = [];
            scope.searchText = "";
            scope.searchResults = [];
            scope.routeTo = function (id) {
                location.path('/viewcalendar/' + id);
            };

            resourceFactory.calendarResource.get({}, function (data) {

                scope.calendars =data;


            });
            scope.initPage = function () {

                var items = resourceFactory.clientResource.getAllClients({
                    offset: 0,
                    limit: scope.clientsPerPage
                }, function (data) {
                    scope.totalClients = data.totalFilteredRecords;
                    scope.clients = data.pageItems;
                });
            }
            scope.initPage();

            scope.search = function () {
                scope.actualClients = [];
                scope.searchResults = [];
                scope.filterText = "";
                var searchString = scope.searchText;
                searchString = searchString.replace(/(^"|"$)/g, '');
                var exactMatch=false;
                var n = searchString.localeCompare(scope.searchText);
                if(n!=0)
                {
                    exactMatch=true;
                }

                if(!scope.searchText){
                    scope.initPage();
                } else {
                    resourceFactory.globalSearch.search({query: searchString , resource: "clients,clientIdentifiers",exactMatch: exactMatch}, function (data) {
                        var arrayLength = data.length;
                        for (var i = 0; i < arrayLength; i++) {
                            var result = data[i];
                            var client = {};
                            client.status = {};
                            client.subStatus = {};
                            client.status.value = result.entityStatus.value;
                            client.status.code  = result.entityStatus.code;
                            if(result.entityType  == 'CLIENT'){

                                client.displayName = result.entityName;
                                client.accountNo = result.entityAccountNo;
                                client.id = result.entityId;
                                client.externalId = result.entityExternalId;
                                client.officeName = result.parentName;
                            }else if (result.entityType  == 'CLIENTIDENTIFIER'){
                                numberOfClients = numberOfClients + 1;
                                client.displayName = result.parentName;
                                client.id = result.parentId;
                                client.externalId = result.parentExternalId;

                            }
                            scope.actualClients.push(client);
                        }
                        var numberOfClients = scope.actualClients.length;
                        scope.totalClients = numberOfClients;
                        scope.clients = scope.actualClients.slice(0, scope.clientsPerPage);
                    });
                }
            }

        }
    });



    mifosX.ng.application.controller('CalendarController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CalendarController]).run(function ($log) {
        $log.info("CalendarController initialized");
    });
}(mifosX.controllers || {}));