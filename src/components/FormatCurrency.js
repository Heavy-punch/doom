import React from 'react';

// import { Container } from './styles';

function FormatCurrency(props) {
    function formatCash(str) {
        if (str.length === 0) {
            return "";
        }
        else {
            return str.split('').reverse().reduce((prev, next, index) => {
                return ((index % 3) ? next : (next + '.')) + prev
            })
        }

    }
    return <p>{formatCash(props.number)} vnd</p>;
}

export default FormatCurrency;