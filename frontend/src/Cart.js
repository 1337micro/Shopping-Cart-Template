"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {ItemComponent, Item} from './Item.js'
class CartComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.state.shoppingList = props.shoppingList || [new Item("Item1", "desc1", 21.90), new Item("Item2", "desc2", 1.90)]
    }
    componentDidMount(){
      console.log("Cart mounted")
    }
    renderItem(name, description, key){
        return <ItemComponent name={name} description={description} key={key} />
    }
  
    render() {
      return (
          <div>
            {this.state.shoppingList.map( 
                (item, index) => {
                    return this.renderItem(item.name, item.description, index)
                } 
            )}
          </div>
          
      );
    }
  }
export {CartComponent};