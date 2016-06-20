import './stylesheets/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import FilterableProductTable from './src/filterable-product-table';

// init shell
initShell();
function initShell() {
    var shell = document.createElement('main');
    shell.className = 'app-shell';
    document.body.appendChild(shell);
    ReactDOM.render(<FilterableProductTable/>, shell);
}