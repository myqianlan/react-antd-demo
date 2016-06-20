import React from 'react';
import {Input, Form, Icon, Checkbox} from 'antd';

const FormItem = Form.Item;

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filterText: '',
            inStockOnly: false
        }
    }
    handleChange(field, e) {
        let v = e;
        const target = e && e.target;
        if (target) {
            if (target.type === 'checkbox') {
                v = target.checked;
            } else {
                v = e.target.value;
            }
        }
        
        this.setState({
            [field]: v
        }, ()=>{
            this.props.onUserInput(
                this.state.filterText,
                this.state.inStockOnly
            );
        });
        
    }

    render() {
        return (
            <Form style={{marginBottom: 10}} inline onSubmit={this.handleSubmit}>
                <FormItem>
                    <Input
                        placeholder="Search..."
                        checked={this.state.filterText}
                        onChange={this.handleChange.bind(this, 'filterText')} />
                </FormItem>
                <FormItem>
                    <Checkbox 
                        value={this.state.inStockOnly}
                        onChange={this.handleChange.bind(this, 'inStockOnly')}>
                        Only show products in stock
                    </Checkbox>
                </FormItem>
            </Form>
        );
    }
}

export default SearchBar;