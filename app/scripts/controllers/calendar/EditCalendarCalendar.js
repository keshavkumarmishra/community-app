(function (module) {
    mifosX.controllers = _.extend(module, {
        EditCalendarController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {

            scope.offices = [];
            scope.sections = [];
            scope.sessions = [];
            scope.periods =[];
            scope.timedurations =[];
            scope.facultys =[];
            scope.subjects =[];
            scope.classes =[];
            scope.days =[];
            scope.formData = {};
            scope.formDat = {};
            scope.forceOffice = null;
            scope.tf = "HH:mm";
            scope.formData.calendarDetails = [{}];
            scope.calendarDetail =[{}];
            scope.calendarData={};



            var requestParams = {staffInSelectedOfficeOnly:true};
            /* if (routeParams.officeId) {
                 requestParams.officeId = routeParams.officeId;
             }
             if(routeParams.sectionId){
                 requestParams.sectionId = routeParams.sectionId;
             }
             if(routeParams.sessionId){
                 requestParams.sessionId = routeParams.sessionId;

             }*/
            alert(routeParams.id);
            alert(routeParams.calendarId);
            if(routeParams.id){
                requestParams.calendarId = routeParams.id;
                alert(routeParams.id);

            }

            resourceFactory.calendarResources.get(requestParams,function(data){
                scope.calendarDetail =data.calendarDetails;
                scope.calendarData=data;
                scope.formData.office=data.officeId;
                scope.formData.class=data.classs.id;
                scope.formData.section= data.section.id;
                scope.formData.session=data.session.id;
                scope.formData.day=data.day.id;
                scope.formData.isActive =data.isactive;


                scope.formData.calendarDetail = data.calendarDetail || [];
                if (scope.formData.calendarDetail == '' ||scope.formData.calendarDetail == null || !scope.formData.calendarDetail) {
                    scope.formData.calendarDetail = [{}];
                } else if (scope.formData.calendarDetail.length == 0) {
                    scope.formData.calendarDetail = [{}];
                }

            })


            /*   requestParams.officeId=1;
               resourceFactory.calendarTemplateResource.get(requestParams, function (data) {
                   scope.days =data.dayOption;

               });*/
            resourceFactory.calendarTemplateResource.get(requestParams, function (data) {

                scope.offices =data.officeOptions;
                scope.classes=data.classOptions;
                scope.sections =data.sectionOptions;
                scope.sessions =data.sessionOption;
                scope.periods =data.periodOptions;
                scope.timedurations =data.timeDurationOptions;
                scope.facultys =data.staffOptions;
                scope.subjects =data.subjectOption;
                scope.days =data.dayOption;


            });

            scope.addCalendarDetails = function () {
                var calendar = {};
                scope.formData.calendarDetails.push(calendar);
            };

            scope.deleteCalendarDetails = function (index) {
                scope.formData.calendarDetails.splice(index, 1);
            };

            // end of family members




            /*     scope.displayPersonOrNonPersonOptions = function (legalFormId) {
                     if(legalFormId == scope.clientPersonId || legalFormId == null) {
                         scope.showNonPersonOptions = false;
                     }else {
                         scope.showNonPersonOptions = true;
                     }
                 };

                 scope.changeOffice = function (officeId) {
                     resourceFactory.clientTemplateResource.get({staffInSelectedOfficeOnly:true, officeId: officeId
                     }, function (data) {
                         scope.staffs = data.staffOptions;
                         scope.savingproducts = data.savingProductOptions;
                     });
                 };

                 scope.setChoice = function () {
                     if (this.formData.active) {
                         scope.choice = 1;
                     }
                     else if (!this.formData.active) {
                         scope.choice = 0;
                     }
                 };
                 if(routeParams.groupId) {
                     scope.cancel = '#/viewgroup/' + routeParams.groupId
                     scope.groupid = routeParams.groupId;
                 }else {
                     scope.cancel = "#/clients"
                 }

                 //return input type
                 //return input type
                 scope.fieldType = function (type) {
                     var fieldType = "";
                     if (type) {
                         if (type == 'CODELOOKUP' || type == 'CODEVALUE') {
                             fieldType = 'SELECT';
                         } else if (type == 'DATE') {
                             fieldType = 'DATE';
                         } else if (type == 'DATETIME') {
                             fieldType = 'DATETIME';
                         } else if (type == 'BOOLEAN') {
                             fieldType = 'BOOLEAN';
                         } else {
                             fieldType = 'TEXT';
                         }
                     }
                     return fieldType;
                 };

                 scope.dateTimeFormat = function (colHeaders) {
                     angular.forEach(colHeaders, function (colHeader, i) {
                         if (colHeaders[i].columnDisplayType == 'DATETIME') {
                             return scope.df + " " + scope.tf;
                         }
                     });
                     return scope.df;
                 };
     -->*/
            scope.submit = function () {
                /*if (WizardHandler.wizard().getCurrentStep() != scope.noOfTabs) {
                    WizardHandler.wizard().next();
                    return;
                }*/
                alert("test");

                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                this.formData.calendarDetails = scope.formData.calendarDetails
                resourceFactory.calendarResource.save(this.formData, function (data) {
                    location.path('/viewcalendar/' + data.calendarId);
                });

            }
        }
    })

    mifosX.ng.application.controller('EditCalendarController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.EditCalendarController]).run(function ($log) {
        $log.info("EditCalendarController initialized");
    });
}(mifosX.controllers || {}));
