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
    this.state.compName= "Body"
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
    return window.fetch("http://70.30.166.248:3001/stock", {
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
    return window.fetch("http://70.30.166.248:3001/cart",{
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
  handleAddToCart(item)
    {
      return window.fetch('http://70.30.166.248:3001/addToCart', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': "application/json; charset=utf-8"
        },
        
        credentials: "include",
        
        body: JSON.stringify(item)
      }).then(res=>res.json())
        .then(res => {
          let index = this.state.shoppingList.map(item=>item.name).indexOf(item.name)
          const shoppingListDeepCopy = JSON.parse(JSON.stringify(this.state.shoppingList))
          if(shoppingListDeepCopy[index])
          {
            shoppingListDeepCopy[index].quantity++;
          }
          else
          {
            console.log("ee")
          }
          this.setState(Object.assign(this.state, {shoppingList:shoppingListDeepCopy}));
          console.log(res)
        });
    }
    requestRemoveFromCart(item)
    {
      return window.fetch('http://70.30.166.248:3001/removeFromCart', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': "application/json; charset=utf-8"
        },
        
        credentials: "include",
        
        body: JSON.stringify(item)
      }).then(res=>res.json())
        .then(res => console.log(res));
    
    }
    
    handleRemoveItem(item)
    {
      if(item.quantity >0)
      {
        this.requestRemoveFromCart(item)
        .then(() =>{
          let index = this.state.shoppingList.map(item=>item.name).indexOf(item.name)
          const shoppingListDeepCopy = JSON.parse(JSON.stringify(this.state.shoppingList))
          if(shoppingListDeepCopy[index])
          {
            shoppingListDeepCopy[index].quantity--;
          }     
          else
          {
            console.log("ee")
          }    
          this.setState(Object.assign(this.state, {shoppingList:shoppingListDeepCopy}));
        })
      }
    }

  renderShop()
  {
    return <ShopComponent handleAddToCart={this.handleAddToCart.bind(this)} stockList={this.state.stockList}></ShopComponent>
  }
  renderCart()
  {
    return <CartComponent handleRemoveItem={this.handleRemoveItem.bind(this)} handleAddToCart={this.handleAddToCart.bind(this)} shoppingList={this.state.shoppingList}></CartComponent>
  }
  render() {
    console.log("Reloading body")
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
