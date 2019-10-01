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
      this.state.isShop = props.isShop || false
      this.state.isCart = props.isCart || false
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
    renderShopItem()
    {
      return (<div>
        <h3>{this.state.name} </h3>
        {this.state.description}. Price: {this.state.price}$ <button onClick={this.handleAddToCart.bind(this)}>Add to Cart</button>
        </div>)
    }
    renderCartItem()
    {
      return (<div>
        <h3>{this.state.name} </h3>
        {this.state.description}. Price: {this.state.price}$ Quantity: {this.state.quantity}
        </div>)
    }

    render() {
      return (
          <div>
            {this.state.isShop ? this.renderShopItem.bind(this)() : null}
            {this.state.isCart ? this.renderCartItem.bind(this)() : null}
              
              
          </div>
          
      );
    }
  }
export {ItemComponent, Item};