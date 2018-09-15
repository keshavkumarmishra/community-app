(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewStudentDetailAttendenceController: function (scope, resourceFactory, routeParams, location, dateFilter) {
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
            if(routeParams.classid)  {
                requestParams.classId = routeParams.classid;
            }
            scope.groupId=routeParams.groupId;
            scope.init=function() {
                this.formData.locale =scope.optlang.code;;
                this.formData.dateFormat = scope.df;
                alert(this.formData.locale);

            }
            scope.init();

                   resourceFactory.studentAttendenceResource.get(requestParams, this.formData,function (data) {
                    scope.totalAttendenceDetails = data.totalFilteredRecords;
                    scope.studentAttendences = data.pageItems;
                    for (var i = 0; i < scope.studentAttendences.length; i++) {
                        if (i <= (scope.studentAttendences.length / 3)) {
                          //  alert("first"+i);
                            scope.studentAttendences1.push(scope.studentAttendences[i]);
                          //  scope.clients1[i].attendanceType = scope.attendanceOptions[0].id;
                        }
                        else if (i>(scope.studentAttendences.length / 3) && i<2*(scope.studentAttendences.length / 3)){

                           // alert("total length"+scope.clients.length / 3);
                          //  alert("actual Length"+3*(scope.clients.length / 3));
                            scope.studentAttendences2.push(scope.studentAttendences[i]);
                          //  scope.clients2[i-(scope.clients1.length)].attendanceType = scope.attendanceOptions[0].id;

                        }else{
                            scope.studentAttendences3.push(scope.studentAttendences[i]);
                            // scope.clients3[i-3].attendanceType = scope.attendanceOptions[0].id;
                            //scope.clients3[indexinput].attendanceType = scope.attendanceOptions[0].id;
                           // indexinput++;


                        }
                    }
                });
            }

    });
    mifosX.ng.application.controller('ViewStudentDetailAttendenceController', ['$scope', 'ResourceFactory', '$routeParams', '$location', 'dateFilter', mifosX.controllers.ViewStudentDetailAttendenceController]).run(function ($log) {
        $log.info("ViewStudentDetailAttendenceController initialized");
    });
}(mifosX.controllers || {}));


