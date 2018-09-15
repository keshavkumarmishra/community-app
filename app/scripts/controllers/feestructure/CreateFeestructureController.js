(function (module) {
    mifosX.controllers = _.extend(module, {
        CreateFeestructureController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {

            scope.offices = [];
            scope.sessions = [];
            scope.formData = {};
            scope.formDat = {};
            scope.forceOffice = null;
            scope.tf = "HH:mm";
            scope.formData.feestructureDetails = [{}];



            var requestParams = {staffInSelectedOfficeOnly:true};
            if (routeParams.officeId) {
                requestParams.officeId = routeParams.officeId;
            }
            requestParams.officeId=1;
            resourceFactory.feeStructureTemplateResource.get(requestParams, function (data) {

                scope.offices =data.officeOptions;
                scope.classes=data.classOptions;
                scope.sessions =data.sessionOptions;
                scope.fees =data.feeOptions;
              });

            scope.addFeeDetails = function () {
                var fee = {};
                scope.formData.feestructureDetails.push(fee);
            };

            scope.deletefeeDetails = function (index) {
               scope.formData.feestructureDetails.splice(index, 1);
            };

                 scope.submit = function () {

                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                this.formData.feeDetails = scope.formData.feeDetails
                resourceFactory.feeResource.save(this.formData, function (data) {
                    location.path('/viewfeestructure/' + data.entityId);
                });

            }}
    })

    mifosX.ng.application.controller('CreateFeestructureController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.CreateFeestructureController]).run(function ($log) {
        $log.info("CreateFeestructureController initialized");
    });
}(mifosX.controllers || {}));
