import React from 'react';
import ProductTable from './components/product-table';
import SearchBar from './components/search-bar';
import products from './models/products';

class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        }
    }

    handleUserInput(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    }

    render() {
        return (
            <div style={{margin: 20}}>
                <SearchBar
                    onUserInput={this.handleUserInput.bind(this)}
                />
                <ProductTable
                    products={products}
                    {...this.state}
                />
            </div>
        )
    }

}

export default FilterableProductTable;
