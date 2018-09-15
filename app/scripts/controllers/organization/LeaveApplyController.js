(function (module) {
    mifosX.controllers = _.extend(module, {
        LeaveApplyController: function (scope,$rootScope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {

            scope.offices = [];
            scope.sessions = [];
            scope.departments = [];
            scope.leaveTypes = [];
            scope.formDat = {};
            scope.forceOffice = null;
            scope.tf = "HH:mm";
            scope.leavedetails = [];
            scope.formData={};
            scope.first={};
            scope.first.fromdate = new Date();
            scope.first.todate = new Date();
            scope.leavetypeid=null;
            //scope.formData.staffid=1;//fromdate,todate



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

            resourceFactory.leaveApplyResource.getleaveDetails({'userId':10}, function (data) {

                scope.formData.officeid=data.officeId;
                scope.formData.staffid=data.staffId;
                scope.formData.departmentid=data.departmentId;
                scope.staffName=data.staffName;

            });


            scope.submit = function () {
                if (scope.first.fromdate) {
                    this.formData.fromdate = dateFilter(scope.first.fromdate, scope.df);
                }
                if (scope.first.todate) {
                    this.formData.todate = dateFilter(scope.first.todate, scope.df);
                }

                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                this.formData.leavetypeid=scope.formDat.leaveType.id;
                alert(this.formData.leavetypeid);
                alert(scope.formData.leavetypeid);
                resourceFactory.leaveApplyResource.save(this.formData, function (data) {
                    location.path('/viewfeestructure/' + data.entityId);
                });

            }}
    })

    mifosX.ng.application.controller('LeaveApplyController', ['$scope','$rootScope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.LeaveApplyController]).run(function ($log) {
        $log.info("LeaveApplyController initialized");
    });
}(mifosX.controllers || {}));
