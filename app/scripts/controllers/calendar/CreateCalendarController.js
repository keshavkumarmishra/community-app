(function (module) {
    mifosX.controllers = _.extend(module, {
        CreateCalendarController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, Upload, $rootScope, routeParams, WizardHandler) {

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



            var requestParams = {staffInSelectedOfficeOnly:true};
            if (routeParams.officeId) {
                requestParams.officeId = routeParams.officeId;
            }
            requestParams.officeId=1;
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

           /* scope.updateColumnHeaders = function(columnHeaderData) {
                var colName = columnHeaderData[0].columnName;
                if (colName == 'id') {
                    columnHeaderData.splice(0, 1);
                }

                colName = columnHeaderData[0].columnName;
                if (colName == 'client_id' || colName == 'office_id' || colName == 'group_id' || colName == 'center_id' || colName == 'loan_id' || colName == 'savings_account_id') {
                    columnHeaderData.splice(0, 1);
                }
            };

            // address

            scope.addAddress=function()
            {
                scope.addressArray.push({});
            }

            scope.removeAddress=function(index)
            {
                scope.addressArray.splice(index,1);
            }




            // end of address


            // family members
*/
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
            location.path('/viewcalendar/' + data.entityId);
        });

    }}
    })

    mifosX.ng.application.controller('CreateCalendarController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', 'Upload', '$rootScope', '$routeParams', 'WizardHandler', mifosX.controllers.CreateCalendarController]).run(function ($log) {
        $log.info("CreateCalendarController initialized");
    });
}(mifosX.controllers || {}));
