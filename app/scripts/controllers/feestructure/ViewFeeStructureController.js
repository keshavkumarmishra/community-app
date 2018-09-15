(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewFeeStructureController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {


            scope.formData = {};
            scope.formDat = {};
            scope.forceOffice = null;
            scope.tf = "HH:mm";
            scope.formData.calendarDetails = [{}];
            scope.feeDetail =[{}];
            scope.feeDataData={};



            var requestParams = {};

            if(routeParams.id){
                requestParams.feeId = routeParams.id;

            }

            resourceFactory.feeResource.get(requestParams,function(data){
                scope.feeDataData=data;
                scope.feeDetail =data.classFeeDetailData;
                scope.feeDataData=data;

            });

            scope.routeToEditfeeStructure=function(id){
                location.path('/editfeestructure/'+id);
            }

        }
    })

    mifosX.ng.application.controller('ViewFeeStructureController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.ViewFeeStructureController]).run(function ($log) {
        $log.info("ViewFeeStructureController initialized");
    });
}(mifosX.controllers || {}));
