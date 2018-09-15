(function (module) {
    mifosX.controllers = _.extend(module, {
        EmployeeEducationController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {

            scope.ten = {};
            scope.twlve = {};
            scope.bachelor = {};
            scope.master ={};
            scope.others ={};
            scope.formData = {};
            scope.formDat = {};
            scope.forceOffice = null;
            scope.tf = "HH:mm";
            scope.formData.seducation = [{}];
            scope.qualifications=[];
            scope.degreedetails=[];



           /* var requestParams = {staffInSelectedOfficeOnly:true};
            if (routeParams.officeId) {
                requestParams.officeId = routeParams.officeId;
            }
            requestParams.officeId=1;
            resourceFactory.staffTemplateResource.get(requestParams, function (staffData) {
                console.log(JSON.stringify(staffData));
                data = staffData.clientBasicDetails;
                scope.qualifications=staffData.educationQualification
                scope.degreedetails=staffData.degreedetails
            });
*/
            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                this.formData.calendarDetails = scope.formData.calendarDetails
                scope.formData.seducation.push(scope.ten);
                scope.formData.seducation.push(scope.twlve);
                scope.formData.seducation.push(scope.bachelor);
                scope.formData.seducation.push(scope.master);
                scope.formData.seducation.push(scope.others);
                this.formData.seducation= scope.formData.seducation;

                resourceFactory.employeeResource.update({'staffId': routeParams.id}, this.formData, function (data) {
                    location.path('/viewemployee/' + data.resourceId);
                });

            }}
    })

    mifosX.ng.application.controller('EmployeeEducationController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.EmployeeEducationController]).run(function ($log) {
        $log.info("EmployeeEducationController initialized");
    });
}(mifosX.controllers || {}));
