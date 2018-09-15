(function (module) {
    mifosX.controllers = _.extend(module, {
        CreateEmployeeController: function (scope, resourceFactory, location, dateFilter,routeParams) {
            //for extension Varabile Decleration

            scope.nomineeaddressabove = false;
            scope.isNomineeNameRequired = false;
            scope.isNomineeGenderRequired = false;
            scope.isNomineeAgeRequired = false;
            scope.isNomineeRelationshipBorrowerRequired = false;
            scope.isNomineeDOBRequired = false;
            scope.isNomineeGuardianAddressRequired = false;
            scope.offices = [];
            scope.staffs = [];
            scope.first = {};
            scope.first.date = new Date();
            scope.first.submitondate = new Date();
            scope.formData = {};
            scope.formData.staffExt = {};
            scope.formData.snaddress = [];
            scope.formData.familyDetails = [{}];
            scope.formData.stafftIdentifierData = [{}, {}];
            scope.formData.snomineeDetails = [{}, {}];
            scope.restrictDate = new Date();
            scope.forceOffice = null;
            scope.clientObject = {};
            scope.selected = false;
            scope.sourceOfLoans = [{}, {}];
            scope.districtOptins = [];
            scope.stateOptions = [];
            scope.salutations=[];
            scope.identityProofOptions =[];
            scope.addressProofOptions =[];
            scope.staffTypeOptions =[];
            scope.restrictDate = new Date();
            scope.staffTypes =[];
            scope.departments=[];
            scope.designationOptions=[];
            scope.genderOptions=[];
            scope.martialStatusOptions=[];


            resourceFactory.officeResource.getAllOfficesInAlphabeticalOrder(function (data) {
                scope.offices = data;
                scope.formData = {
                    isLoanOfficer: true,
                    officeId: scope.offices[0].id,
                };
            });
            scope.$watch('formData.snomineeDetails[0].dateOfBirth', function () {
                scope.AgeCalculate(0);
            });
            scope.$watch('formData.snomineeDetails[1].dateOfBirth', function () {
                 scope.AgeCalculate(1);
            });
            scope.AgeCalculate = function (a) {

                scope.birthDate = [];
                scope.todayDates = [];
                if (a == 0) {
                    scope.date = dateFilter(this.formData.snomineeDetails[0].dateOfBirth, 'dd-MM-yyyy');
                }
                else {
                    scope.date = dateFilter(this.formData.snomineeDetails[1].dateOfBirth, 'dd-MM-yyyy');
                }
                var today = dateFilter(new Date(), 'dd-MM-yyyy');
                scope.birthDate = scope.date.split('-');
                scope.todayDates = today.split('-');
                var age = scope.todayDates[2] - scope.birthDate[2];
                var m = scope.todayDates[1] - scope.birthDate[1];
                if (m < 0 || (m === 0 && scope.todayDates[0] < scope.birthDate[0])) {
                    age--;
                }
                if (a == 0) {
                    this.formData.snomineeDetails[0].age = age;
                }
                else {
                    this.formData.snomineeDetails[1].age = age;

                }
            }

                        //newley Addes for extension
            var requestParams = {staffInSelectedOfficeOnly: true};
            if (routeParams.groupId) {
                c.groupId = routeParams.groupId;
            }
            if (routeParams.officeId) {
                requestParams.officeId = routeParams.officeId;
            }
            requestParams.staffId=1;

            resourceFactory.staffTemplateResource.get(requestParams, function (staffData) {
                console.log(JSON.stringify(staffData));
                data = staffData.clientBasicDetails;
                scope.salutations = staffData.salutation;
                scope.districtOptins = staffData.district;
                scope.stateOptions = staffData.state;
                scope.martialStatusOptions = staffData.maritalStatus;
                scope.identityProofOptions = staffData.identityProof;
                scope.addressProofOptions =staffData.addressProof
                scope.staffTypes =staffData.staffType;
                scope.departments=staffData.department;
                scope.designationOptions=staffData.designation;
                scope.genderOptions=staffData.gender;

                scope.addressTypes = staffData.addressTypes;
                scope.familyrelationShipOptions = staffData.familyrelationShip;

            });


            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                var joiningDate = dateFilter(scope.formData.joiningDate, scope.df);
                this.formData.dateFormat = scope.df;
                this.formData.joiningDate = joiningDate;
                this.formData.snaddress=_(this.formData.snaddress).toArray();
                this.formData.snomineeDetails=_(this.formData.snomineeDetails).toArray();
                this.formData.stafftIdentifierData=_(this.formData.stafftIdentifierData).toArray();
                if (this.formData.snaddress) {
                    for (var i = 0; i < this.formData.snaddress.length; i++) {
                        if (i == 0) {
                            for (var j = 0; j < scope.addressTypes.length; j++) {
                                if (scope.addressTypes[j].name == 'Comuniation Address') {
                                    this.formData.snaddress[i].addressType = scope.addressTypes[j].id;
                                }
                            }
                        } else if (i == 1) {
                            for (var j = 0; j < scope.addressTypes.length; j++) {
                                if (scope.addressTypes[j].name == 'KYC address') {
                                    this.formData.snaddress[i].addressType = scope.addressTypes[j].id;
                                }
                            }
                        }
                        this.formData.snaddress[i].locale = scope.optlang.code;
                        this.formData.snaddress[i].dateFormat = scope.df;
                    }
                }
                if (this.formData.snomineeDetails) {
                    for (var i = 0; i < this.formData.snomineeDetails.length; i++) {
                        this.formData.snomineeDetails[i].locale = scope.optlang.code;
                        this.formData.snomineeDetails[i].dateFormat = scope.df;
                    }
                }

                for (var i in this.formData.snomineeDetails) {
                    if (this.formData.snomineeDetails[i].dateOfBirth) {
                        this.formData.snomineeDetails[i].dateOfBirth = dateFilter(scope.formData.snomineeDetails[i].dateOfBirth, scope.df);
                    }
                    if (this.formData.snomineeDetails[i].guardianDateOfBirth) {
                        this.formData.snomineeDetails[i].guardianDateOfBirth = dateFilter(scope.formData.snomineeDetails[i].guardianDateOfBirth, scope.df);
                    }
                }

                resourceFactory.employeeResource.save(this.formData, function (data) {
                    alert("sucessful");
                    location.path('/viewemployee/' + data.resourceId);
                });
            };
        }
    });
    mifosX.ng.application.controller('CreateEmployeeController', ['$scope', 'ResourceFactory', '$location', 'dateFilter','$routeParams', mifosX.controllers.CreateEmployeeController]).run(function ($log) {
        $log.info("CreateEmployeeController initialized");
    });
}(mifosX.controllers || {}));
