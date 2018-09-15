(function (module) {
    mifosX.controllers = _.extend(module, {
        EditStaffExperienceController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {

            scope.forceOffice = null;
            scope.tf = "HH:mm";
            scope.sexperience = [];
            scope.qualifications=[];
            scope.degreedetails=[];



            scope.staffeducationalData = [];
            resourceFactory.employeeResource.get({staffId: routeParams.id}, function (data) {
                scope.qualifications=data.educationQualification;
                scope.degreedetails=data.degreedetails;
                scope.sexperience = data.staffexperienceData;

            });
            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                this.formData.calendarDetails = scope.formData.calendarDetails

                resourceFactory.employeeResource.update({'staffId': routeParams.id}, this.formData, function (data) {
                    location.path('/viewemployee/' + data.resourceId);
                });

            }}
    })

    mifosX.ng.application.controller('EditStaffExperienceController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.EditStaffExperienceController]).run(function ($log) {
        $log.info("EditStaffExperienceController initialized");
    });
}(mifosX.controllers || {}));
