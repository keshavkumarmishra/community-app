(function (module) {
    mifosX.controllers = _.extend(module, {
        EditLeaveManagementController: function (scope, $rootScope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {


            scope.formData = {};
            scope.formDat = {};
            scope.forceOffice = null;
            scope.tf = "HH:mm";
            scope.formData.calendarDetails = [{}];
            scope.feeDetail =[{}];
            scope.feeDataData={};
            scope.formData.feestructureDetails=[{}];
            scope.offices = [];
            scope.sessions = [];
            scope.departments = [];
            scope.leaveTypes = [];
            scope.leavedetails=[];

            var requestParams = {};
            if(routeParams.id){
                requestParams.leavemanagementId = routeParams.id;
                alert(routeParams.id);
                alert($rootScope.loginuserids);

            }
            scope.addLeaveDetails = function () {
                var leavedetail= {};
                scope.leavedetails.push(leavedetail);
            };

            scope.deleteLeaveDetails = function (index) {
                scope.leavedetails.splice(index, 1);
            };

            //requestParams.officeId=1;
            resourceFactory.leaveManagementResource.get( function (data) {

                scope.offices =data.officeOptions;
                scope.sessions=data.sessionOptions;
                scope.departments =data.departmentOptions;
                scope.leaveTypes =data.leaveTypeOptions;
            });
            /*resourceFactory.leaveManagementSaveResource.get(requestParams,function(data){
                scope.leaveData=data;
                scope.formData.leavedetails =data.classFeeDetailData;
                scope.formData.officeid =data.officeId;
                scope.formData.departmentid=data.classs.id;
                scope.formData.sessionid=data.session.id;
                scope.formData.isActive=data.isactive;

            });*/
            resourceFactory.leaveManagementSaveResource.getAllleaveDetails(requestParams,function(data){
                scope.leaveData=data;
                scope.formData.leavedetails =data.leaveManagementDataDetails;
                scope.formData.office =data.officeId;
                scope.formData.departmentid=data.department.id;
                scope.formData.sessionid=data.session.id;
                scope.formData.isActive=data.isactive;


                scope.leavemanagementData=data;
                scope.leavedetails =data.leaveManagementDataDetails;
                // scope.feeDataData=data;

            });


            scope.submit = function () {

                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                this.formData.leavedetails =  scope.leavedetails;
                resourceFactory.leaveManagementSaveResource.update({'leavemanagementId': routeParams.id},this.formData, function (data) {



                    location.path('/viewleavemanagementdetails/' + data.entityId);
                });

            }}



    })

    mifosX.ng.application.controller('EditLeaveManagementController', ['$scope','$rootScope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.EditLeaveManagementController]).run(function ($log) {
        $log.info("EditLeaveManagementController initialized");
    });
}(mifosX.controllers || {}));
