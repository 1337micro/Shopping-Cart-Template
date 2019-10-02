"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {ItemComponent, Item} from './Item.js'
import { createReadStream } from 'fs';
class CartComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      
      this.state.subtotal = 0
    }
    componentDidMount(){
      console.log("Cart mounted")
    }
    renderItem(item, key){

        return <ItemComponent item={item} handleAddToCart={this.props.handleAddToCart} handleRemoveItem={this.props.handleRemoveItem}  isCart={true} key={key} />
    }
    
    
  
    
    renderCartEmpty()
    {
      return <h6>This cart is empty</h6>
    }

    addSubtotalToState()
    {
      this.setState(Object.assign(this.state, {subtotal: this.calculateSubtotal()}))
    }
    calculateSubtotal()
    {
      let reduction = (prev,curr)=>prev + (curr.price * curr.quantity)
      
      return this.props.shoppingList.reduce(reduction, 0)
    }
    calculateGst()
    {
      return this.calculateSubtotal() * 0.09975
    }
    calculateHst()
    {
      return (this.calculateSubtotal() + this.calculateGst()) * 0.05
    }
    calculateGrandTotal()
    {
      return this.calculateSubtotal() + this.calculateGst() + this.calculateHst()
    }
    renderSubtotal()
    {
      return <div>Subtotal: {this.calculateSubtotal().toFixed(2) }$</div>
    }
    renderGst(){
      return <h3>GST: {this.calculateGst().toFixed(2)}$</h3>
    }
    renderHst(){
      return <h3>HST: {this.calculateHst().toFixed(2)}$</h3>
    }
    renderGrandTotal()
    {
      return <h3>Grand total: {this.calculateGrandTotal().toFixed(2)}$</h3>
    }

    render() {
      console.log("reloading cart")
      return (
          <div>
            <h1>My Cart</h1>
            {this.props.shoppingList.length === 0 ?  this.renderCartEmpty(): null }
            {this.props.shoppingList.map( 
                (item, index) => {
                    return this.renderItem(item, index)
                } 
            )}
            {this.props.shoppingList.length !== 0 ? this.renderSubtotal() : null }
            {this.props.shoppingList.length !== 0 ? this.renderGst(): null}
            {this.props.shoppingList.length !== 0 ? this.renderHst(): null}
            {this.props.shoppingList.length !== 0 ? this.renderGrandTotal(): null}
          </div>
          
      );
    }
  }
export {CartComponent};