angular.module('angularSchemaFormUiDatepicker').directive('uiDatepicker', function($log, uibDateParser, $translate) {
    var template = '<div class="input-group"><input datepicker-options="dateOptions" ng-change="syncSfWithUib()" current-text="{{dateOptions.currentText}}" close-text="{{dateOptions.closeText}}" clear-text="{{dateOptions.clearText}}" type="text" class="form-control" uib-datepicker-popup="{{dateOptions.dateFormat}}" ng-model="dt" is-open="opened"  /><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button></span></div>';
    return {
        restrict: 'E',
        require: 'ngModel',
        priority: 1,
        scope: {
            ngModel: "="
        },
        template: template,
        link: function(scope, element, attrs, ngModel) {

            if (attrs.datepickerOptions) {
                attrs.datepickerOptions = angular.fromJson(attrs.datepickerOptions);
            }

            ngModel.$formatters.push(function(value){
              scope.dt = moment(value).toDate();
            });


            //scope.dt = scope.ngModel;
            scope.syncSfWithUib = function() {
                if (moment(scope.dt,'DD.MM.YYYY').isValid()) {
                    scope.ngModel = moment(scope.dt).format('YYYY-MM-DD');
                } else {
                    scope.dt = undefined;
                    scope.ngModel = undefined;
                }
            }
            scope.syncSfWithUib();

            scope.dateOptions = {
                dateFormat: 'shortDate',
                minDate: null,
                maxDate: null
            };

            $translate('ANGULAR_SCHEMA_FORM_UI_DATEPICKER_CURRENT').then(function(current) {
                scope.dateOptions.currentText = current;
            }, function(translationId) {
                scope.dateOptions.currentText = 'today';
            });

            $translate('ANGULAR_SCHEMA_FORM_UI_DATEPICKER_CLOSE').then(function(close) {
                scope.dateOptions.closeText = close;
            }, function(translationId) {
                scope.dateOptions.closeText = 'close';
            });

            $translate('ANGULAR_SCHEMA_FORM_UI_DATEPICKER_CLEAR').then(function(clear) {
                scope.dateOptions.clearText = clear;
            }, function(translationId) {
                scope.dateOptions.clearText = 'clear';
            });

            if (attrs.datepickerOptions.minDate === 'today') {
                attrs.datepickerOptions.minDate = new Date();
            } else {
                attrs.datepickerOptions.minDate = moment(attrs.datepickerOptions.minDate, 'YYYY-MM-DD').toDate();
            }
            if (attrs.datepickerOptions.maxDate === 'today') {
                attrs.datepickerOptions.maxDate = new Date();
            } else {
                attrs.datepickerOptions.maxDate = moment(attrs.datepickerOptions.maxDate, 'YYYY-MM-DD').toDate();
            }

            scope.dateOptions = angular.merge(scope.dateOptions, attrs.datepickerOptions);

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
