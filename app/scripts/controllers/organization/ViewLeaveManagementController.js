(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewLeaveManagementController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {


            scope.formData = {};
            scope.formDat = {};
            scope.forceOffice = null;
            scope.tf = "HH:mm";
            scope.formData.leaveManagement = [{}];
            scope.leaveManagementDetails =[];
            scope.leavemanagementData={};



            var requestParams = {};

            if(routeParams.id){
                requestParams.leavemanagementId = routeParams.id;
                alert(routeParams.id);

            }

            resourceFactory.leaveManagementSaveResource.getAllleaveDetails(requestParams,function(data){
                scope.leavemanagementData=data;
                scope.leaveManagementDetails =data.leaveManagementDataDetails;
               // scope.feeDataData=data;

            });

            scope.routeToLeaveManagement=function(id){
                location.path('/editleaveManagement/'+id);
            }

        }
    })

    mifosX.ng.application.controller('ViewLeaveManagementController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.ViewLeaveManagementController]).run(function ($log) {
        $log.info("ViewLeaveManagementController initialized");
    });
}(mifosX.controllers || {}));
