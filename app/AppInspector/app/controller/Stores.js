/*
 * File: app/controller/Stores.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
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

Ext.define('AI.controller.Stores', {
    extend: 'Ext.app.Controller',

    requires: [
        'AI.util.Store',
        'AI.util.InspectedWindow'
    ],

    models: [
        'Store',
        'Record'
    ],
    stores: [
        'Stores',
        'Records'
    ],
    views: [
        'Stores'
    ],

    init: function(application) {
        var me = this;

        me.control({
            'panel#StoreInspector': {
                'activate': me.onActivate
            },
            'button#RefreshStores': {
                'click': me.onRefreshStoresClick
            },
            'filterfield#FilterStoresList': {
                'applyfilter': me.onFilterStores
            },
            'gridpanel#StoreList': {
                'itemclick': me.onStoreGridSelection
            },
            'gridpanel#RecordList' : {
                'itemclick'   : me.onRecordGridSelection
            }
        });
    },

    onActivate: function(panel) {
        // load the "Stores" upfront
        var initialLoad = panel.initialLoad,
            grid = panel.down('gridpanel#StoreList');

        if (!initialLoad && grid) {
            // ... but only once
            panel.initialLoad = true;

            this.onStoreGridActivate(panel);
        }
    },

    onStoreGridActivate: function(panel) {
        var grid = panel.down('#StoreList'),
            gridStore = grid.getStore();

        gridStore.removeAll();

        grid.setLoading('Loading stores...');

        AI.util.InspectedWindow.eval(
            AI.util.Store.getStores,
            null,
            function (stores) {
                Ext.each(stores, function (store) {
                    var model = Ext.create('AI.model.Store', store);

                    gridStore.add(model);
                });

                grid.setLoading(false);
            }
        );
    },

    onRefreshStoresClick: function(btn) {
        var view = btn.up('#StoreInspector'),
            filter = view.down('#FilterStoresList');

        filter.reset();
        this.onStoreGridActivate(view);
    },

    onFilterStores: function(field, value) {
        var grid = field.up('#StoreList'),
            store = grid.getStore();

        store.clearFilter();

        if (value !== '') {
            store.filter([{
                anyMatch: true,
                caseSensitive: false,
                property: 'id',
                value: value
            }]);
        }
    },

    onStoreGridSelection: function(storeGrid, record, item, index, e, eOpts) {
        var parent = Ext.ComponentQuery.query('#StoreDetails')[0],
            grid = parent.down('#RecordList'),
            store = grid.getStore(),
            propertyGrid = parent.down('#RecordDetail');

        store.removeAll();
        propertyGrid.setSource({});

        store.getProxy().inspectedStoreId = record.get('id');

        store.load({
            callback : function(records, operation, success) {
                record.set('count', this.getTotalCount());
            }
        });
    },

    onRecordGridSelection: function(dataview, record, item, index, e, eOpts) {
        var panel    = dataview.up('gridpanel'),
            property = panel.nextSibling();

        property.setSource(record.raw.modelData);
    }

});
