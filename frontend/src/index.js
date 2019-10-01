import React from 'react';
import ReactDOM from 'react-dom';
import {CartComponent} from './Cart.js'
import {ShopComponent} from './Shop.js'
import {NavBarComponent, defaultNavBarItems} from './NavBar.js'
import './index.css';


class Body extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.stockList = []
    this.state.shoppingList = []

    this.state.showShop = true;
    this.state.showCart = false;
    this.init()
  }
  init(){
    let promise1 = this.getCart().then( (resp) => {
      if(resp!= null && resp.cart != null)
      {
        this.setState(Object.assign(this.state.shoppingList, resp.cart))
      }
    })
    let promise2 = this.getStock().then( (stock) => {
      if(stock != null)
      {
        this.setState(Object.assign(this.state.stockList, stock))
      }
    })
    return Promise.all([promise1, promise2])

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
  handleNavChange(navBarItem)
  {
    this.init().finally( () => {
    if(navBarItem.name ==="My Cart")
      {
        this.setState(Object.assign(this.state, {showShop: false, showCart: true}))
      }
    else if(navBarItem.name ==="Shop")
      {
        this.setState(Object.assign(this.state, {showShop: true, showCart: false}))
      }
    })
    
    

  }
  renderShop()
  {
    return <ShopComponent stockList={this.state.stockList}></ShopComponent>
  }
  renderCart()
  {
    return <CartComponent shoppingList={this.state.shoppingList}></CartComponent>
  }
  render() {
    return (
      
      <div>
        <NavBarComponent onNavChange={this.handleNavChange.bind(this)} navBarItems ={defaultNavBarItems} />
        {this.state.showShop? this.renderShop.bind(this)() : null}
        {this.state.showCart? this.renderCart.bind(this)() : null}
        
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Body />,
  document.getElementById('root')
);
