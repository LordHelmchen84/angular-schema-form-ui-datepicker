angular.module('angularSchemaFormUiDatepicker', [
  'ui.bootstrap',
  'schemaForm',
  'templates'
]).config(function(schemaFormDecoratorsProvider, sfBuilderProvider) {

  schemaFormDecoratorsProvider.defineAddOn(
    'bootstrapDecorator',           // Name of the decorator you want to add to.
    'datepicker',                      // Form type that should render this add-on
    'src/templates/angular-schema-form-ui-datepicker.html',  // Template name in $templateCache
    sfBuilderProvider.stdBuilders   // List of builder functions to apply.
  );

});
