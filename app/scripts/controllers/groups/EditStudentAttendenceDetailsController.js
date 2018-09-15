(function (module) {
    mifosX.controllers = _.extend(module, {
        EditStudentAttendenceDetailsController: function (scope, resourceFactory, routeParams, location, dateFilter) {
            scope.group = [];
            scope.first = {};
            scope.first.date = new Date();
            scope.formData = {};
            scope.sections = [];
            scope.classes =[];
            scope.studentAttendences1=[];
            scope.studentAttendences2=[];
            scope.studentAttendences3=[];
            scope.studentAttendences=[];



            var requestParams = {staffInSelectedOfficeOnly:true};
            if (routeParams.id) {
                requestParams.attendenceId = routeParams.id;
            }
            scope.groupId=routeParams.groupId;
            if(routeParams.classid)  {
                requestParams.classId = routeParams.classid;
            }
            scope.init=function() {
                this.formData.locale =scope.optlang.code;;
                this.formData.dateFormat = scope.df;
                alert(this.formData.locale);

            }
            scope.init();

            requestParams.officeId=1;
            resourceFactory.calendarTemplateResource.get(requestParams, function (data) {
                scope.classes=data.classOptions;
                scope.sections =data.sectionOptions;
            });
            resourceFactory.groupMeetingResource.getMeetingInfo({groupId:1, templateSource: 'template', calenderId: 1}, function (data) {
                scope.attendanceOptions = data.attendanceTypeOptions;
                scope.officeId=data.officeId;
             });
            var indexinput=0;
            resourceFactory.studentAttendenceResource.get(requestParams, this.formData,function (data) {
                scope.totalAttendenceDetails = data.totalFilteredRecords;
                scope.studentAttendences = data.pageItems;
                scope.formData.class=scope.studentAttendences[0].classs.id;
                scope.formData.section=scope.studentAttendences[0].section.id ;
                if (scope.studentAttendences[0].attendenceDate) {
                    var attendencedate = dateFilter(scope.studentAttendences[0].attendenceDate, scope.df);
                    scope.first.date== new Date(attendencedate);

                }
                for (var i = 0; i < scope.studentAttendences.length; i++) {
                    if (i <= (scope.studentAttendences.length / 3)) {
                        scope.studentAttendences1.push(scope.studentAttendences[i]);
                          scope.studentAttendences1[i].attendanceType = scope.studentAttendences[i].studentAttendenceDetailData.attendenceType.id;
                    }
                    else if (i>(scope.studentAttendences.length / 3) && i<2*(scope.studentAttendences.length / 3)){
                        scope.studentAttendences2.push(scope.studentAttendences[i]);
                          scope.studentAttendences2[i-(scope.studentAttendences1.length)].attendanceType =scope.studentAttendences[i].studentAttendenceDetailData.attendenceType.id;

                    }else{
                        scope.studentAttendences3.push(scope.studentAttendences[i]);
                        scope.studentAttendences3[indexinput].attendanceType = scope.studentAttendences[i].studentAttendenceDetailData.attendenceType.id;
                        indexinput++;


                    }
                }
            });
            scope.attendanceUpdate = function () {
                var reqDate = dateFilter(scope.first.date, scope.df);
                this.formData.office=1;
                this.formData.attendenceId=scope.studentAttendences[0].id;
                this.formData.studentattendenceDetails = [];
                for (var i = 0; i < scope.studentAttendences.length; i++) {
                    if (i < scope.studentAttendences1.length) {
                           this.formData.studentattendenceDetails[i] = {
                            roolNo: scope.studentAttendences1[i].studentAttendenceDetailData.roolNo,
                            attendenceType: scope.studentAttendences1[i].attendanceType
                        };
                    } else if (i >=(scope.studentAttendences1.length) && i < 2 * (scope.studentAttendences.length / 3)) {
                        this.formData.studentattendenceDetails[i] = {
                            roolNo: scope.studentAttendences2[i - (scope.studentAttendences2.length)].studentAttendenceDetailData.roolNo,
                            attendenceType: scope.studentAttendences2[i - (scope.studentAttendences1.length)].attendanceType
                        };
                    } else {
                        this.formData.studentattendenceDetails[i] = {
                            roolNo: scope.studentAttendences3[i - 2 * (scope.studentAttendences1.length)].studentAttendenceDetailData.roolNo,
                            attendenceType: scope.studentAttendences3[i - 2 * (scope.studentAttendences1.length)].attendanceType
                        }
                    }
                }
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                this.formData.attendenceDate = reqDate;
                resourceFactory.studentAttendenceResource.update(this.formData, function (data) {
                    location.path('/viewgroup/' + routeParams.groupId);
                });
            }

        }

    });
    mifosX.ng.application.controller('EditStudentAttendenceDetailsController', ['$scope', 'ResourceFactory', '$routeParams', '$location', 'dateFilter', mifosX.controllers.EditStudentAttendenceDetailsController]).run(function ($log) {
        $log.info("EditStudentAttendenceDetailsController initialized");
    });
}(mifosX.controllers || {}));


