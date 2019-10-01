"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {ItemComponent, Item} from './Item.js'
class CartComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.state.shoppingList = props.shoppingList || []
    }
    componentDidMount(){
      console.log("Cart mounted")
    }
    renderItem(name, description, price, quantity, key){
        return <ItemComponent name={name} description={description} isCart={true} price={price} quantity={quantity} key={key} />
    }
  
    render() {
      return (
          <div>
            {this.state.shoppingList.map( 
                (item, index) => {
                    return this.renderItem(item.name, item.description, item.price, item.quantity, index)
                } 
            )}
          </div>
          
      );
    }
  }
export {CartComponent};