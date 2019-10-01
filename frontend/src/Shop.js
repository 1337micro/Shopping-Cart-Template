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
    renderItem(name, description, price, key){
        return <ItemComponent name={name} description={description} price={price} key={key} />
    }
  
    render() {
      return (
          <div>
            {this.state.stockList.map( 
                (item, index) => {
                    return this.renderItem(item.name, item.description, item.price, index)
                } 
            )}
          </div>
          
      );
    }
  }
export {ShopComponent};