(function (module) {
    mifosX.controllers = _.extend(module, {
        GroupAttendanceController: function (scope, resourceFactory, routeParams, location, dateFilter) {
            scope.group = [];
            scope.first = {};
            scope.first.date = new Date();
            scope.formData = {};
            scope.clients1=[];
            scope.clients2=[];
            scope.clients3=[];
            scope.sections = [];
            scope.classes =[];

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

            resourceFactory.groupMeetingResource.getMeetingInfo({groupId: routeParams.groupId, templateSource: 'template', calenderId: routeParams.calendarId}, function (data) {
                scope.clients = data.clients;
                scope.attendanceOptions = data.attendanceTypeOptions;
                scope.officeId=data.officeId;
                alert(data.officeId);
                /*the following code help to display default attendance type is 'present'*/
               var indexinput=0;
                for (var i = 0; i < scope.clients.length; i++) {
                    if (i <= (scope.clients.length / 3)) {
                        alert("first"+i);
                        scope.clients1.push(scope.clients[i]);
                        scope.clients1[i].attendanceType = scope.attendanceOptions[0].id;
                    }
                    else if (i>(scope.clients.length / 3) && i<2*(scope.clients.length / 3)){
                        scope.clients2.push(scope.clients[i]);
                        scope.clients2[i-(scope.clients1.length)].attendanceType = scope.attendanceOptions[0].id;

                    }else{
                        scope.clients3.push(scope.clients[i]);
                       // scope.clients3[i-3].attendanceType = scope.attendanceOptions[0].id;
                        scope.clients3[indexinput].attendanceType = scope.attendanceOptions[0].id;
                        indexinput++;


                    }
                }
            });

            scope.attendanceUpdate = function (id) {
                var reqDate = dateFilter(scope.first.date, scope.df);
                this.formData.office=1;
                this.formData.studentattendenceDetails = [];
                //this.formData.office=scope.officeId;
                //alert(this.formData.office);

                for (var i = 0; i < scope.clients.length; i++) {
                    if (i < scope.clients1.length) {
                        alert("clients"+scope.clients.length);
                        alert("clients1"+scope.clients1.length);
                        alert("inside"+JSON.stringify(scope.clients1[i].id))
                        this.formData.studentattendenceDetails[i] = {
                            roolNo: scope.clients1[i].id,
                            attendenceType: scope.clients1[i].attendanceType
                        };
                    } else if (i >=(scope.clients1.length) && i < 2 * (scope.clients.length / 3)) {
                        this.formData.studentattendenceDetails[i] = {
                            roolNo: scope.clients2[i - (scope.clients1.length)].id,
                            attendenceType: scope.clients2[i - (scope.clients1.length)].attendanceType
                        };
                    } else {
                        this.formData.studentattendenceDetails[i] = {
                            roolNo: scope.clients3[i - 2 * (scope.clients1.length)].id,
                            attendenceType: scope.clients3[i - 2 * (scope.clients1.length)].attendanceType
                        }
                    }
                }
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                this.formData.calendarId = id;
                this.formData.attendenceDate = reqDate;
                resourceFactory.studentAttendenceResource.save(this.formData, function (data) {
                    location.path('/viewgroup/' + routeParams.groupId);
                });
            }}

    });
    mifosX.ng.application.controller('GroupAttendanceController', ['$scope', 'ResourceFactory', '$routeParams', '$location', 'dateFilter', mifosX.controllers.GroupAttendanceController]).run(function ($log) {
        $log.info("GroupAttendanceController initialized");
    });
}(mifosX.controllers || {}));


