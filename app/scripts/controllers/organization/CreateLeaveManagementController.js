(function (module) {
    mifosX.controllers = _.extend(module, {
        CreateLeaveManagementController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {

            scope.offices = [];
            scope.sessions = [];
            scope.departments = [];
            scope.leaveTypes = [];
            scope.formDat = {};
            scope.forceOffice = null;
            scope.tf = "HH:mm";
            scope.leavedetails = [];
            scope.formData={};



            var requestParams = {staffInSelectedOfficeOnly:true};
            if (routeParams.officeId) {
                requestParams.officeId = routeParams.officeId;
            }
            requestParams.officeId=1;
            resourceFactory.leaveManagementResource.get(requestParams, function (data) {

                scope.offices =data.officeOptions;
                scope.sessions=data.sessionOptions;
                scope.departments =data.departmentOptions;
                scope.leaveTypes =data.leaveTypeOptions;
            });

            scope.addLeaveDetails = function () {
                var leave = {};
                scope.leavedetails.push(leave);
            };

            scope.deleteLeaveDetails = function (index) {
                scope.leavedetails.splice(index, 1);
            };

            scope.submit = function () {

                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                this.formData.leavedetails = scope.leavedetails;
                resourceFactory.leaveManagementSaveResource.save(this.formData, function (data) {
                    location.path('/viewfeestructure/' + data.entityId);
                });

            }}
    })

    mifosX.ng.application.controller('CreateLeaveManagementController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.CreateLeaveManagementController]).run(function ($log) {
        $log.info("CreateLeaveManagementController initialized");
    });
}(mifosX.controllers || {}));
