angular.module('angularSchemaFormUiDatepicker').directive('uiDatepicker', function($log) {
    var template = '<div class="input-group"><input datepicker-options="dateOptions" type="text" class="form-control" uib-datepicker-popup="{{dateOptions.dateFormat}}" ng-model="ngModel" is-open="opened" ng-required="true"  /><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button></span></div>';
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            ngModel: "="
        },
        template: template, //'<input type="text" class="form-control" ng-model="modelValue" ng-blur="updateModel(modelValue)"></input>',
        link: function(scope, element, attrs, ngModel) {

            //$log.debug(element);
            //$log.debug(attrs);

            scope.dateOptions = angular.fromJson(attrs.datepickerOptions);
            //$log.debug(scope.dateOptions);
            scope.modelValue = ngModel.$viewValue;

            scope.updateModel = function(modelValue) {
                ngModel.$setViewValue(modelValue);
            };
            scope.popupOpen = false;
            scope.openPopup = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                scope.popupOpen = true;
            };

            scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                scope.opened = true;
            };
        }
    };
});
