angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('src/templates/angular-schema-form-ui-datepicker.html','<div>\n    <!-- Surrounding DIV for sfField builder to add a sfField directive to. -->\n    <!--<h2>{{form.myOwnFormOption}}</h2>-->\n    <!-- Create your own form options -->\n\n    <label>{{form.title}}</label>\n\n    <ui-datepicker ng-model="ngModel" sf-field-model schema-validate="form"></ui-datepicker>\n\n    <!-- sf-field-model let\'s the ngModel builder know that you want a ng-model that matches against the form key here -->\n    <!-- schema-validate="form" validates the form against the schema -->\n\n    <span class="help-block" sf-message="form.description"></span>\n    <!-- Description & Validation messages -->\n\n</div>\n');}]);
angular.module('angularSchemaFormUiDatepicker', [
  'ui.bootstrap',
  'schemaForm',
  'templates'
]).config(function(schemaFormDecoratorsProvider, sfBuilderProvider) {

  schemaFormDecoratorsProvider.defineAddOn(
    'bootstrapDecorator',           // Name of the decorator you want to add to.
    'angular-schema-form-ui-datepicker',                      // Form type that should render this add-on
    'src/templates/angular-schema-form-ui-datepicker.html',  // Template name in $templateCache
    sfBuilderProvider.stdBuilders   // List of builder functions to apply.
  );

});

angular.module('angularSchemaFormUiDatepicker').directive('uiDatepicker', function() {
    var template = '<div class="input-group"><input type="text" class="form-control" uib-datepicker-popup ng-model="ngModel" is-open="opened" ng-required="true"  /><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button></span></div>';
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            ngModel: "="
        },
        template: template, //'<input type="text" class="form-control" ng-model="modelValue" ng-blur="updateModel(modelValue)"></input>',
        link: function(scope, element, attrs, ngModel) {
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
