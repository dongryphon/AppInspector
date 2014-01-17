/*
 * File: app/controller/Profile.js
 *
 * This file was generated by Sencha Architect version 3.0.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('AI.controller.Profile', {
    extend: 'Ext.app.Controller',

    requires: [
        'AI.util.extjs.Profile'
    ],

    init: function(application) {
        this.control({
            '#Overnested' : {
                'select'      : this.onSelectOvernestedComponent
            },

            'button#ProfileOvernesting' : {
                click : this.onOvernestedProfileClick
            },

            '#BoxLayouts' : {
                'select'      : this.onSelectOvernestedComponent
            },

            'button#ProfileBoxLayouts' : {
                click : this.onNestedBoxLayoutsClick
            }
        });
    },

    onSelectOvernestedComponent: function(selModel, record, index, eOpts) {
        AI.util.InspectedWindow.eval(
            AI.util.InspectedWindow.highlight,
            record.get('cmpId'),
            Ext.emptyFn
        );
    },

    onOvernestedProfileClick: function(btn) {
        var grid = btn.up('#Overnested'),
            store = grid.getStore();

        store.removeAll();
        grid.setLoading('Profiling for overnested components...');

        AI.util.InspectedWindow.eval(
            AI.util.extjs.Profile.getOvernestedComponents,
            null,
            function (components) {
                Ext.each(components, function (component) {
                    var model = Ext.create('AI.model.Overnested', component);

                    store.add(model);
                });

                grid.setLoading(false);
            }
        );
    },

    onNestedBoxLayoutsClick: function(btn) {
        var grid = btn.up('#BoxLayouts'),
            store = grid.getStore();

        store.removeAll();
        grid.setLoading('Profiling for overnested box layouts...');

        AI.util.InspectedWindow.eval(
            AI.util.extjs.Profile.getNestedBoxLayouts,
            null,
            function (components) {
                Ext.each(components, function (component) {
                    var model = Ext.create('AI.model.Overnested', component);

                    store.add(model);
                });

                grid.setLoading(false);
            }
        );
    }

});
