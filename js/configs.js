const keys = [
    [
        {
            id: 'keyClear',
            text: 'C',
            class: 'action'
        },
        {
            id: 'keyAbsolute',
            text: '+/&ndash;',
            class: 'action'
        },
        {
            id: 'keyPercent',
            text: '%',
            class: 'action'
        },
        {
            id: 'keyDivide',
            text: '&#247;',
            class: 'operand',
            operand: '/'
        }
    ],
    [
        {
            id: 'key7',
            text: '7',
            class: 'number'
        },
        {
            id: 'key8',
            text: '8',
            class: 'number'
        },
        {
            id: 'key9',
            text: '9',
            class: 'number'
        },
        {
            id: 'keyMultiply',
            text: 'x',
            class: 'operand',
            operand: '*'
        }
    ],
    [
        {
            id: 'key4',
            text: '4',
            class: 'number'
        },
        {
            id: 'key5',
            text: '5',
            class: 'number'
        },
        {
            id: 'key6',
            text: '6',
            class: 'number'
        },
        {
            id: 'keyMinus',
            text: '&ndash;',
            class: 'operand',
            operand: '-'
        }
    ],
    [
        {
            id: 'key1',
            text: '1',
            class: 'number'
        },
        {
            id: 'key2',
            text: '2',
            class: 'number'
        },
        {
            id: 'key3',
            text: '3',
            class: 'number'
        },
        {
            id: 'keyPlus',
            text: '+',
            class: 'operand',
            operand: '+'
        }
    ],
    [
        {
            id: 'key0',
            text: '0',
            class: 'number'
        },
        {
            id: 'keyDecimal',
            text: '.'
        },
        {
            id: 'keyEquals',
            text: '=',
            class: 'action'
        }
    ]
];

const operandsMap = {
    'shiftdigit8': {
        operand: '*',
        elementId: 'keyMultiply'
    },
    'shiftequal': {
        operand: '+',
        elementId: 'keyPlus'
    },
    'slash': {
        operand: '/',
        elementId: 'keyDivide'
    },
    'minus': {
        operand: '-',
        elementId: 'keyMinus'
    }
};

export { keys, operandsMap };
