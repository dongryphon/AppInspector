Ext.define('AI.model.Record', {
    extend : 'Ext.data.Model',

    requires : [
        'Ext.data.Field',
        'Ext.data.identifier.Uuid'
    ],

    fields : [
        {
            name : 'id'
        },
        {
            defaultValue : true,
            name         : 'isLeaf',
            type         : 'boolean'
        },
        {
            name : 'text'
        }
    ],

    idgen : {
        type : 'uuid'
    }
});