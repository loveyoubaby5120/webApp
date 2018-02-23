import * as React from 'react';

const styles: { [k: string]: React.CSSProperties } = {
    'thead': {
        fontWeight: 600,
        backgroundColor: '#f2f2f2',
    },
    'thead tr': {
        height: 50,
    },
    'thead th': {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    'thead th:first-child': {
        textAlign: 'left',
        paddingLeft: 20,
    },
    'thead th:last-child': {
        paddingRight: 20,
    },
    'tbody tr': {
        borderBottom: 'solid #e4e4e4 1px',
    },
    'tbody td': {
        textAlign: 'center',
    },
    'tbody td:first-child': {
        padding: '15px 0px',
        textAlign: 'left',
        paddingLeft: 20,
    },
};

export default styles;
