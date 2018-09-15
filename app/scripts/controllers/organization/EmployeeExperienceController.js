(function (module) {
    mifosX.controllers = _.extend(module, {
        EmployeeExperienceController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {

            scope.qualification = [];
            scope.degreedetail = [];
            scope.formData = {};
            scope.formDat = {};
            scope.forceOffice = null;
            scope.tf = "HH:mm";
            scope.formData.sexperience = [{}];



            var requestParams = {staffInSelectedOfficeOnly:true};
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


            scope.addExperienceDetails = function () {
                var experience = {};
                scope.formData.sexperience.push(experience);
            };

            scope.deletestaffExperience = function (index) {
                scope.formData.sexperience.splice(index, 1);
            };


            scope.submit = function () {

                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                this.formData.sexperience = scope.formData.sexperience;
                resourceFactory.employeeResource.update({'staffId': routeParams.id}, this.formData, function (data) {
                    location.path('/viewemployee/' + data.resourceId);
                });

            }}
    })

    mifosX.ng.application.controller('EmployeeExperienceController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.EmployeeExperienceController]).run(function ($log) {
        $log.info("EmployeeExperienceController initialized");
    });
}(mifosX.controllers || {}));
