(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewStudentAttendenceController: function (scope, resourceFactory, routeParams, location, dateFilter) {
            scope.group = [];
            scope.first = {};
            scope.first.date = new Date();
            scope.formData = {};
            scope.sections = [];
            scope.classes =[];
            scope.studentAttendences=[];

            resourceFactory.groupResource.get({groupId: routeParams.groupId, associations: 'all'}, function (data) {
                scope.group = data;
                scope.meeting = data.collectionMeetingCalendar;
            });

            var requestParams = {staffInSelectedOfficeOnly:true};
            if (routeParams.officeId) {
                requestParams.officeId = routeParams.officeId;
            }
            requestParams.officeId=1;
            resourceFactory.calendarTemplateResource.get(requestParams, function (data) {
                scope.classes=data.classOptions;
                scope.sections =data.sectionOptions;
            });
            scope.routeTo=function(id,classid){
                location.path('/viewstudentdetailattendence/'+ id+"/"+classid);
            }


            scope.studentrecordPerPage = 15;

            scope.getResultsPage = function (pageNumber) {
                if(scope.searchText){
                    var startPosition = (pageNumber - 1) * scope.studentrecordPerPage;
                    scope.studentAttendences = scope.actualClients.slice(startPosition, startPosition + scope.studentrecordPerPage);
                    return;
                }
                var items = resourceFactory.clientResource.getAllClients({
                    offset: ((pageNumber - 1) * scope.studentrecordPerPage),
                    limit: scope.studentrecordPerPage
                }, function (data) {
                    scope.studentAttendences = data.pageItems;
                });
            }


            scope.attendanceUpdate = function (id) {
                var requestParams1 = {staffInSelectedOfficeOnly:true};
                if (routeParams.officeId) {
                    requestParams1.officeId = routeParams.officeId;
                }
                requestParams1.officeId=1;
                requestParams1.fromDate = dateFilter(scope.first.fromdate, scope.df);
                requestParams1.toDate = dateFilter(scope.first.todate, scope.df);
                requestParams1.classId = scope.first.class;
                requestParams1.sectionId = scope.first.section;
                requestParams1.offset=0;
                requestParams1.limit=scope.studentrecordPerPage
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;



                resourceFactory.studentAttendenceResource.get(requestParams1, this.formData,function (data) {
                    scope.totalAttendenceDetails = data.totalFilteredRecords;
                    scope.studentAttendences = data.pageItems;
                 //   location.path('/viewgroup/' + routeParams.groupId);
                });
            }}

    });
    mifosX.ng.application.controller('ViewStudentAttendenceController', ['$scope', 'ResourceFactory', '$routeParams', '$location', 'dateFilter', mifosX.controllers.ViewStudentAttendenceController]).run(function ($log) {
        $log.info("ViewStudentAttendenceController initialized");
    });
}(mifosX.controllers || {}));


