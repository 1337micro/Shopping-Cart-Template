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