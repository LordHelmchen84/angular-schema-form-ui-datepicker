angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('src/templates/angular-schema-form-ui-datepicker.html','<div\n    class="form-group {{::form.htmlClass + \' \' + idClass}} schema-form-ui-datepicker"\n    ng-class="{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false}">\n    <!-- Surrounding DIV for sfField builder to add a sfField directive to. -->\n\n    <!-- Create your own form options -->\n    <label class="control-label {{::form.labelHtmlClass}}" ng-class="showTitle()" for="{{::fieldId(true, false)}}">{{form.title}}</label>\n\n    <ui-datepicker datepicker-options="{{form.dateOptions}}" datename="{{::fieldId(true, false)}}" ng-disabled="form.readonly" sf-changed="form" ng-model="ngModel" sf-field-model schema-validate="form"></ui-datepicker>\n\n    <!-- sf-field-model let\'s the ngModel builder know that you want a ng-model that matches against the form key here -->\n    <!-- schema-validate="form" validates the form against the schema -->\n\n    <span class="help-block" sf-message="form.description"></span>\n    <!-- Description & Validation messages -->\n\n</div>\n');}]);
angular.module('angularSchemaFormUiDatepicker', [
    'ui.bootstrap',
    'schemaForm',
    'templates',
    'pascalprecht.translate'
]).config(function(schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider, sfPathProvider) {



    var addOn = schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'datepicker', // Form type that should render this add-on
        'src/templates/angular-schema-form-ui-datepicker.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders// List of builder functions to apply.
    );




});

angular.module('angularSchemaFormUiDatepicker').directive('uiDatepicker', function($log, uibDateParser, $translate) {
    var template = '<div class="input-group"><input datepicker-options="dateOptions" ng-change="syncSfWithUib()" current-text="{{dateOptions.currentText}}" close-text="{{dateOptions.closeText}}" clear-text="{{dateOptions.clearText}}" type="text" class="form-control" uib-datepicker-popup="{{dateOptions.dateFormat}}" ng-model="dt" is-open="opened" ng-required="true"  /><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button></span></div>';
    return {
        restrict: 'E',
        require: 'ngModel',
        priority: 1,
        scope: {
            ngModel: "="
        },
        template: template,
        link: function(scope, element, attrs, ngModelController) {



            if (attrs.datepickerOptions) {
                attrs.datepickerOptions = angular.fromJson(attrs.datepickerOptions);
            }

            scope.dt = scope.ngModel;
            scope.syncSfWithUib = function() {
                scope.ngModel = moment(scope.dt).format('YYYY-MM-DD');
            }

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
