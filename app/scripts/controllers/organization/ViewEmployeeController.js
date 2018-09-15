(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewEmployeeController: function (scope, routeParams, route, location, resourceFactory, http, $uibModal, API_VERSION, $rootScope, Upload) {
            scope.employee = {};
            scope.staffExt={};
            resourceFactory.employeeResource.get({staffId: routeParams.id}, function (data) {
                scope.employee = data;
                scope.staffdetailData=data.staffDetailsData;


                for(var i in data.staffDetailsData.staffaddressExtData){
                    if(data.staffDetailsData.staffaddressExtData[i].addressTypeLable == 'Comuniation Address'){
                        scope.communicationAddress = data.staffDetailsData.staffaddressExtData[i];
                    }else if(data.staffDetailsData.staffaddressExtData[i].addressTypeLable == 'KYC address'){
                        scope.kycAddress = data.staffDetailsData.staffaddressExtData[i];
                    }

                }
            });


            scope.capturePic = function () {
                $uibModal.open({
                    templateUrl: 'capturepic.html',
                    controller: CapturePicCtrl,
                    windowClass: 'modalwidth700'
                });
            };
            var CapturePicCtrl = function ($scope, $uibModalInstance) {

                $scope.picture = null;
                $scope.error = null;
                $scope.videoChannel = {
                    video: null,
                    videoWidth: 320,
                    videoHeight: 240
                };

                $scope.onVideoSuccess = function () {
                    $scope.error = null;
                };

                $scope.onVideoError = function (err) {
                    if(typeof err != "undefined")
                        $scope.error = err.message + '(' + err.name + ')';
                };

                $scope.takeScreenshot = function () {
                    if($scope.videoChannel.video) {
                        var picCanvas = document.createElement('canvas');
                        var width = $scope.videoChannel.video.width;
                        var height = $scope.videoChannel.video.height;

                        picCanvas.width = width;
                        picCanvas.height = height;
                        var ctx = picCanvas.getContext("2d");
                        ctx.drawImage($scope.videoChannel.video, 0, 0, width, height);
                        var imageData = ctx.getImageData(0, 0, width, height);
                        document.querySelector('#clientSnapshot').getContext("2d").putImageData(imageData, 0, 0);
                        $scope.picture = picCanvas.toDataURL();
                    }
                };
                $scope.uploadscreenshot = function () {
                    alert( $rootScope.hostUrl + API_VERSION + '/clients/' + routeParams.id + '/images', $scope.picture);
                    if($scope.picture != null) {
                        http({
                            method: 'POST',
                            url: $rootScope.hostUrl + API_VERSION + '/clients/' + routeParams.id + '/images',
                            data: $scope.picture
                        }).then(function (imageData) {
                            if (!scope.$$phase) {
                                scope.$apply();
                            }
                            $uibModalInstance.close('upload');
                            route.reload();
                        });
                    }
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.reset = function () {
                    $scope.picture = null;
                }
            };
        }
    });
    mifosX.ng.application.controller('ViewEmployeeController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http', '$uibModal', 'API_VERSION', '$rootScope', 'Upload', mifosX.controllers.ViewEmployeeController]).run(function ($log) {
        $log.info("ViewEmployeeController initialized");
    });
}(mifosX.controllers || {}));
