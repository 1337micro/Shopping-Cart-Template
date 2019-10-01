"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
function Item(name, description, price){
    this.name = name;
    this.description = description;
    this.price = price;
}
class ItemComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = new Item(props.name, props.description, props.price)
    }
    componentDidMount(){
      console.log("Item mounted")
    }

    render() {
      return (
          <div>
              <h1>{this.state.name}</h1>
              <h3>{this.state.description}</h3>
          </div>
          
      );
    }
  }
export {ItemComponent, Item};