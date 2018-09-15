(function (module) {
    mifosX.controllers = _.extend(module, {
        EditStaffEducationController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {

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



            scope.staffeducationalData = [];
            resourceFactory.employeeResource.get({staffId: routeParams.id}, function (data) {
                scope.qualifications=data.educationQualification;
                scope.degreedetails=data.degreedetails;
                scope.staffeducationalData = data.staffeducationalData;
                for(var i in scope.staffeducationalData.length){
                    if(scope.staffeducationalData[i].scope.staffeducationalData=='10th'){
                        scope.ten=scope.staffeducationalData[i];
                    }else if(scope.staffeducationalData[i].scope.staffeducationalData=='12th'){
                        scope.twlve=scope.staffeducationalData[i];
                    }else if(scope.staffeducationalData[i].scope.staffeducationalData=='Graduation'){
                        scope.bachelor=scope.staffeducationalData[i];
                    }else if(scope.staffeducationalData[i].scope.staffeducationalData=='PostGraduation'){
                        scope.master=scope.staffeducationalData[i];
                    } else if(scope.staffeducationalData[i].scope.staffeducationalData=='Others') {
                        scope.others=scope.staffeducationalData[i];
                    }
                }
            });
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

    mifosX.ng.application.controller('EditStaffEducationController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.EditStaffEducationController]).run(function ($log) {
        $log.info("EditStaffEducationController initialized");
    });
}(mifosX.controllers || {}));
