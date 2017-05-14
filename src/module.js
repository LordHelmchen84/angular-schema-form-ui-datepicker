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
