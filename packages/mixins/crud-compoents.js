/* eslint-disable */
export default function() {
    return {
        props: {
            label: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: 'default'
            },
            tip: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            editable: {
              type: Boolean,
              default: true
            },
            allowClear: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: ""
            },
            dic: {
                type: Array,
                default: () => []
            },
            placeholder: {
                type: String,
                default: ''
            },
            min: {
                type: Number,
            },
            max: {
                type: Number,
            },
            border: {
                type: Boolean,
                default: false
            },
            props: {
                type: Object,
                default () {
                    return {
                        // id: 'id',
                        label: 'label',
                        value: 'id',
                        children: 'children'
                    };
                }
            }
        },
        data() {
            return {
                text: undefined,
            };
        },
        watch: {
            value: function(n, o) {
                console.log(n, o,'n, o1111')
                this.text = this.value;
            }
        },
        computed: {
            valueKey: function() {
                return this.props.value || 'value';
            },
            labelKey: function() {
                return this.props.label || 'label';
            },
            childrenKey: function() {
                return this.props.children || 'children';
            },
            idKey: function() {
                return this.props.id || 'id';
            }
        },
        created() {
            console.log(this.value,'text2222')
            this.text = this.value  || null;
        }
    }
}
/* eslint-enable */