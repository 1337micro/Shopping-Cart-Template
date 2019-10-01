"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
function Item(name, description, price, quantity){
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity
}
class ItemComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = new Item(props.name, props.description, props.price, props.quantity)
    }
    componentDidMount(){
      console.log("Item mounted")
    }

    handleAddToCart()
    {
      window.fetch('http://localhost:3001/addToCart', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': "application/json; charset=utf-8"
        },
        
        credentials: "include",
        
        body: JSON.stringify(this.state)
      }).then(res=>res.json())
        .then(res => console.log(res));
    }

    render() {
      return (
          <div>
              <h3>{this.state.name} </h3>{this.state.description}. Price: {this.state.price}$ <button onClick={this.handleAddToCart.bind(this)}>Add to Cart</button>
              
          </div>
          
      );
    }
  }
export {ItemComponent, Item};