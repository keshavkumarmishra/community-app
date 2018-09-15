(function (module) {
    mifosX.controllers = _.extend(module, {
        EditEmployeeController: function (scope, routeParams, resourceFactory, location, dateFilter) {
            scope.offices = [];
            scope.restrictDate = new Date();

            resourceFactory.employeeResource.get({staffId: routeParams.id, template: 'true'}, function (data) {
                scope.offices = data.allowedOffices;
                scope.staffTypes=data.staffType;
                scope.departments=data.staffDataBasicDetails.department;
                scope.martialStatusOptions=data.staffDataBasicDetails.maritalStatus;
                scope.designationOptions=data.designation;
                scope.genderOptions=data.gender;
                scope.districtOptins=data.district;
                scope.stateOptions=data.state;
                scope.identityProofOptions=data.identityProof;
                scope.addressProofOptions=data.addressProof;
                scope.salutations=data.salutation;
                scope.familyrelationShipOptions=data.familyrelationShip;
                scope.staffId = data.id;
                if (data.joiningDate) {
                    var editDate = dateFilter(data.joiningDate, scope.df);
                    data.joiningDate = new Date(editDate);
                }
                scope.formData = {
                    firstname: data.firstname,
                    middlename:data.middlename,
                    lastname: data.lastname,
                    isLoanOfficer: data.isLoanOfficer,
                    officeId: data.officeId,
                    mobileNo: data.mobileNo,
                    isActive: data.isActive,
                    joiningDate: data.joiningDate
                };
                scope.formData.staffExt={
                    staffType:data.staffDetailsData.staffDataExt.employeeType,
                    departments:data.staffDetailsData.staffDataExt.department,
                    maritalstatus:data.staffDetailsData.staffDataExt.maritalStatus,
                    designation:data.staffDetailsData.staffDataExt.designation,
                    genderId:data.staffDetailsData.staffDataExt.gender,
            }

                scope.formData.snaddress = [{}, {}];

                scope.formData.stafftIdentifierData = [{}, {}, {}, {}];
                scope.formData.snomineeDetails = [{}, {}, {}];

                scope.formData.staffExt = data.staffDataExt;

                if (data.staffaddressExtData && data.staffaddressExtData.length > 0) {
                    for (var i in data.staffaddressExtData) {
                        if (data.staffaddressExtData[i].addressTypeLable == "Comuniation Address") {
                            scope.formData.snaddress[0] = data.staffaddressExtData[i];
                        } else if (data.staffaddressExtData[i].addressTypeLable == "KYC address") {
                            scope.formData.snaddress[1] = data.staffaddressExtData[i];
                        }
                    }
                }

                for (var i = 0; i < scope.formData.snaddress.length; i++) {
                    if (!scope.formData.snaddress[i].state && scope.stateOptions[0] && scope.stateOptions[0].id) {
                        scope.formData.snaddress[i].state = scope.stateOptions[0].id;
                    }
                }

                if (data.staffDataBasicDetails.staffIdentifierData && data.staffDataBasicDetails.staffIdentifierData.length > 0) {
                    for (var i in data.staffDataBasicDetails.staffIdentifierData) {
                            for (var j in scope.identityProofOptions) {
                                if (scope.identityProofOptions[j].id == data.staffDataBasicDetails.staffIdentifierData[i].documentTypeId) {
                                    scope.formData.stafftIdentifierData[0] = data.staffDataBasicDetails.staffIdentifierData[i];
                                    break;
                                }
                            }
                        }
                }

                if (data.staffDataBasicDetails.staffIdentifierData && data.staffDataBasicDetails.staffIdentifierData.length > 0) {
                    for (var i in data.staffDataBasicDetails.staffIdentifierData) {
                            for (var j in scope.addressProofOptions) {
                                if (scope.addressProofOptions[j].id == data.staffIdentifierData) {
                                    scope.formData.stafftIdentifierData[1] = data.staffDataBasicDetails.staffIdentifierData[i];
                                    break;
                                }
                            }
                        }
                    }

                scope.formData.snomineeDetails = data.staffnomineeDetailsData || [];
                if ( scope.formData.snomineeDetails == '' ||  scope.formData.snomineeDetails == null || ! scope.formData.snomineeDetails) {
                    scope.formData.snomineeDetails = [{}, {}];
                } else if ( scope.formData.snomineeDetails.lenght == 0) {
                    scope.formData.snomineeDetails = [{}, {}];
                } else if ( scope.formData.snomineeDetails.lenght == 1) {
                    scope.formData.snomineeDetails.push({});
                }

                for (var i in  scope.formData.snomineeDetails) {
                    if ( scope.formData.snomineeDetails[i].dateOfBirth) {
                        var dateOfBirth = dateFilter( scope.formData.snomineeDetails[i].dateOfBirth, scope.df);
                        scope.formData.snomineeDetails[i].dateOfBirth = new Date(dateOfBirth);
                    }
                    if ( scope.formData.snomineeDetails[i].guardianDateOfBirth) {
                        var guardianDateOfBirth = dateFilter( scope.formData.snomineeDetails[i].guardianDateOfBirth, scope.df);
                        scope.formData.snomineeDetails[i].guardianDateOfBirth = new Date(guardianDateOfBirth);
                    }
                }
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
                resourceFactory.employeeResource.update({'staffId': routeParams.id}, this.formData, function (data) {
                    location.path('/viewemployee/' + data.resourceId);
                });
            };
        }
    });
    mifosX.ng.application.controller('EditEmployeeController', ['$scope', '$routeParams', 'ResourceFactory', '$location', 'dateFilter', mifosX.controllers.EditEmployeeController]).run(function ($log) {
        $log.info("EditEmployeeController initialized");
    });
}(mifosX.controllers || {}));
