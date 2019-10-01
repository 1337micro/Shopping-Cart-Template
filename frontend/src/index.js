import React from 'react';
import ReactDOM from 'react-dom';
import {CartComponent} from './Cart.js'
import {ShopComponent} from './Shop.js'
import {generateNavBarComponent} from './NavBar.js'
import './index.css';


class Body extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.stockList = []
    this.state.shoppingList = []
    this.init()
  }
  init(){
    this.getCart().then( (resp) => {
      if(resp.cart != null)
      {
        this.setState(Object.assign(this.state.shoppingList, resp.cart))
      }
    })
    this.getStock().then( (stock) => {
      if(stock != null)
      {
        this.setState(Object.assign(this.state.stockList, stock))
      }
    })
  }
  getStock()
  {
    return window.fetch("http://localhost:3001/stock", {
      credentials: "include"
    })
    .then( (response) => {
      return response.text();
    })
    .then( (responseText) => {
      if(responseText != null && responseText!== "")
      {       
        console.log(responseText)
        return JSON.parse(responseText)
      }
      //otherwise return undefined
    })
    .catch(
      (error) => {
        console.error(error)
      }
    )
  }
  getCart(){
    return window.fetch("http://localhost:3001/cart",{
      credentials: "include"
    })
    .then( (response) => {
      return response.text();
      
    })
    .then( (responseText) => {
      if(responseText != null && responseText!== "")
      {       
        let cart = JSON.parse(responseText);
        return cart
      }
      //otherwise return undefined
    })
    .catch(
      (error) => {
        console.error(error)
      }
    )
    
  }
  render() {
    return (
      
      <div>
        {generateNavBarComponent()}
        <ShopComponent stockList={this.state.stockList}></ShopComponent>
        <CartComponent shoppingList={this.state.shoppingList}></CartComponent>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Body />,
  document.getElementById('root')
);
