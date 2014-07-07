/**
 * @class   AI.view.components.bindings.Bindings
 * @extends Ext.grid.Panel
 */
Ext.define('AI.view.components.bindings.Bindings', {
    extend: 'Ext.grid.Panel',
    xtype : 'bindings',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.grid.View',
        'Ext.grid.column.Column',
        'Ext.grid.column.Boolean',
        'Ext.grid.column.Template',
        'AI.view.field.Filter'
    ],

    mixins: [
        'AI.mixin.Localize'
    ],

    title : 'MVVM Bindings',
    cls   : 'highlight',
    itemId: 'bindings',

    viewModel: {
        type: 'bindings'
    },
    bind     : {
        store: '{Bindings}'
    },

    viewConfig: {
        markDirty  : false,
        stripeRows : true,
        /**
         * @param   {Ext.data.Model}    record
         *
         * @returns {String}
         */
        getRowClass: function (record) {
            var cls = [];

            if (!record.get('isValid')) {
                cls.push('isInvalidBinding');
            }

            return cls.join(' ');
        }
    },
    columns   : {
        defaults: {
            sortable    : true,
            menuDisabled: true,
            draggable   : false
        },
        items   : [
            {
                xtype       : 'booleancolumn',
                width       : 5,
                resizable   : false,
                defaultWidth: 5,
                sortable    : false,
                dataIndex   : 'isOwn',
                groupable   : false,
                hideable    : false,
                lockable    : false,
                tdCls       : 'indicator',
                falseText   : ' ',
                trueText    : ' '
            },
            {
                xtype    : 'gridcolumn',
                dataIndex: 'key',
                text     : 'Binding Key',
                flex     : 1
            },
            {
                xtype    : 'templatecolumn',
                dataIndex: 'boundTo',
                text     : 'Bound To',
                flex     : 1,
                tpl      : '\\{{boundTo}\\}'
            },
            {
                xtype    : 'gridcolumn',
                dataIndex: 'value',
                text     : 'Value',
                flex     : 1,
                /**
                 * @param {Object}          value
                 * @param {Object}          metaData
                 * @param {Ext.data.Model}  record
                 *
                 * @returns {String}
                 */
                renderer : function (value, metaData, record) {
                    var v = value;

                    if (value === null) {
                        v = 'null';
                    }

                    if (record.data.text === 'undefined') {
                        v = 'undefined';
                    }

                    return '<span class="highlight ' + record.get('type') + ' ' + v + '">' + v + '</span>';
                }
            }
        ]
    },

    dockedItems: [
        {
            xtype : 'toolbar',
            dock  : 'top',
            border: 1,
            cls   : 'components-toolbar top',
            items : [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype     : 'filterfield',
                    forceEnter: false,  // we can do this on {Ext.data.Store}
                    listeners : {
                        applyfilter: 'onFilterComponentDetails'
                    }
                }
            ]
        }
    ]
});