import React from 'react';
import CategoryRow from './category-row';
import ProductRow from './product-row';

import 'antd/lib/table/style/index.css';

class ProductTable extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let rows = [], lastCategory = null;
        this.props.products.map(product=>{
            if (!product.name.toLowerCase().includes(this.props.filterText.toLowerCase()) || (!product.stocked && this.props.inStockOnly)) {
                return;
            }

            if (product.category !== lastCategory) {
                rows.push(<CategoryRow category={product.category} key={product.category}/>);
            }

            rows.push(<ProductRow product={product} key={product.name}/>);
                lastCategory = product.category;
            })
        
        if (rows.length > 0) {
            return (
                <div className="ant-table ant-table-bordered">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
                </div>
            );
        } else {
            return <p>\_(ツ)_/¯</p>;
        }
    }
}

export default ProductTable