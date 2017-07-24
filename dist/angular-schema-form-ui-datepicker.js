angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('src/templates/angular-schema-form-ui-datepicker.html','<div\n    class="form-group has-feedback schema-form-ui-datepicker"\n    ng-class="{\n       \'has-error\': form.disableErrorState !== true && hasError(),\n       \'has-success\': form.disableSuccessState !== true && hasSuccess(),\n       \'has-feedback\': form.feedback !== false,\n       \'required\': form.required === true\n     }">\n\n    <!-- Create your own form options -->\n    <label class="control-label {{::form.labelHtmlClass}}" ng-class="{\'sr-only\': !showTitle()}" for="{{::fieldId(true, false)}}">{{form.title}}</label>\n\n    <ui-datepicker\n        name="{{::fieldId(true, false)}}"\n        ng-attr-placeholder="{{::form.placeholder}}"\n        id="{{::fieldId(true, false)}}"\n        datepicker-options="{{form.dateOptions}}"\n        datename="{{::fieldId(true, false)}}"\n        ng-disabled="form.readonly"\n        sf-changed="form"\n        ng-model="ngModel"\n        sf-field-model\n        schema-validate="form"></ui-datepicker>\n\n    <!-- sf-field-model let\'s the ngModel builder know that you want a ng-model that matches against the form key here -->\n    <!-- schema-validate="form" validates the form against the schema -->\n    <span\n        ng-if="form.feedback !== false"\n        class="form-control-feedback"\n        ng-class="evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': form.disableSuccessState !== true && hasSuccess(), \'glyphicon-remove\': form.disableErrorState !== true && hasError() }"\n        aria-hidden="true"></span>\n\n    <span ng-if="hasError() || hasSuccess()" id="{{::fieldId(true, true) + \'-status\'}}" class="sr-only">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span>\n\n    <div class="help-block" sf-message="form.description"></div>\n    <!-- Description & Validation messages -->\n\n</div>\n');}]);
angular.module('angularSchemaFormUiDatepicker', [
    'ui.bootstrap',
    'schemaForm',
    'templates',
    'pascalprecht.translate'
]).config(function(schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider, sfPathProvider) {




    var simpleTransclusion = sfBuilderProvider.builders.simpleTransclusion;
    var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
    var ngModel = sfBuilderProvider.builders.ngModel;
    var sfField = sfBuilderProvider.builders.sfField;
    var condition = sfBuilderProvider.builders.condition;
    var array = sfBuilderProvider.builders.array;
    var numeric = sfBuilderProvider.builders.numeric;


    var defaults = [sfField, ngModelOptions, ngModel, array, condition];
    var addOn = schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'datepicker', // Form type that should render this add-on
        'src/templates/angular-schema-form-ui-datepicker.html', // Template name in $templateCache
        defaults // List of builder functions to apply.
    );

    schemaFormProvider.prependRule('string', function(name, schema, options) {
        if (schema.format === 'datepicker') {
            // dirty workaround here

            if (schema['x-schema-form']) {
                schema['x-schema-form'].type = "datepicker";
            } else {
                schema['x-schema-form'] = {
                    "type": "datepicker"
                }
            }

            var f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = 'datepicker';

            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
        }
    });


});

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
              if(value){
                scope.dt = moment(value).toDate();
              }else{
                scope.dt = undefined;
                scope.ngModel = undefined;
              }

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
