"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {ItemComponent, Item} from './Item.js'
class ShopComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.state.stockList = props.stockList || []
    }
    componentDidMount(){
      
    }
    renderItem(item, key){
        return <ItemComponent item={item} handleAddToCart={this.props.handleAddToCart} isShop={true} key={key} />
    }
  
    render() {
      return (
          <div>
              <h1>Store</h1>
            {this.state.stockList.map( 
                (item, index) => {
                    return this.renderItem(item, index)
                } 
            )}
          </div>
          
      );
    }
  }
export {ShopComponent};