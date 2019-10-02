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
      this.state = props.item
      
      this.state.isShop = props.isShop || false
      this.state.isCart = props.isCart || false
    }
    componentDidMount(){
      console.log("Item mounted")
    }
    componentDidUpdate(prevProps, prevState, snapshot)
    {
      if(this.props.item != prevProps.item)
      {
        this.setState(Object.assign(this.state,this.props.item))
      }
    }
    
    renderShopItem()
    {
      return (<div>
        <h3>{this.state.name} </h3>
        {this.state.description}. Price: {this.state.price}$ 
          <button onClick={()=>this.props.handleAddToCart(this.state)}>Add to Cart</button>
        </div>)
    }
    renderCartItem()
    {
      return (<div>
        <h3>{this.state.name} </h3>
        {this.state.description}. Price: {this.state.price}$ Quantity: {this.renderQuantitySubtractButton()} {this.state.quantity} {this.renderQuantityAddButton()}
        </div>)
    }

    renderQuantityAddButton()
    {
      return (<button onClick={this.props.handleAddToCart.bind(this, this.state)}>+</button>)
    }
    renderQuantitySubtractButton()
    {
      return (<button onClick={this.props.handleRemoveItem.bind(this, this.state)}>-</button>)
    }

    render() {
      console.log("reloading items")
      return (
          <div>
            {this.state.isShop ? this.renderShopItem.bind(this)() : null}
            {this.state.isCart ? this.renderCartItem.bind(this)() : null}
              
              
          </div>
          
      );
    }
  }
export {ItemComponent, Item};