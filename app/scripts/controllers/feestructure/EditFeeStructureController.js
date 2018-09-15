(function (module) {
    mifosX.controllers = _.extend(module, {
        EditFeeStructureController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {


            scope.formData = {};
            scope.formDat = {};
            scope.forceOffice = null;
            scope.tf = "HH:mm";
            scope.formData.calendarDetails = [{}];
            scope.feeDetail =[{}];
            scope.feeDataData={};
            scope.formData.feestructureDetails=[{}]


            var requestParams = {};

            if(routeParams.id){
                requestParams.feeId = routeParams.id;
            }
            scope.addFeeDetails = function () {
                var fee= {};
                scope.formData.feestructureDetails.push(fee);
            };

            scope.deletefeeDetails = function (index) {
                scope.formData.feestructureDetails.splice(index, 1);
            };

            requestParams.officeId=1;
            resourceFactory.feeStructureTemplateResource.get(requestParams, function (data) {

                scope.offices =data.officeOptions;
                scope.classes=data.classOptions;
                scope.sessions =data.sessionOptions;
                scope.fees =data.feeOptions;
            });
            resourceFactory.feeResource.get(requestParams,function(data){
                scope.feeDataData=data;
                scope.formData.feestructureDetails =data.classFeeDetailData;
                scope.formData.office =data.officeId;
                scope.formData.class=data.classs.id;
                scope.formData.session=data.session.id;
                scope.formData.isActive=data.isactive;

            });


            scope.submit = function () {

                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                this.formData.feestructureDetails = scope.formData.feestructureDetails
                resourceFactory.feeResource.update({'feeId': routeParams.id},this.formData, function (data) {



                    location.path('/viewfeestructure/' + data.entityId);
                });

            }}



    })

    mifosX.ng.application.controller('EditFeeStructureController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.EditFeeStructureController]).run(function ($log) {
        $log.info("EditFeeStructureController initialized");
    });
}(mifosX.controllers || {}));
