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
