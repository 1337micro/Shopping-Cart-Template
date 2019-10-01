import React from 'react';
import ReactDOM from 'react-dom';
import {CartComponent} from './Cart.js'
import {generateNavBarComponent} from './NavBar.js'
import './index.css';


class Body extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getCart().then( (cart) => {
      if(cart != null)
      {
        this.state.shoppingList = cart
      }
    })
  }
 
  getCart(){
    return window.fetch("http://localhost:3001/cart")
    .then( (response) => {
      return response.text();
      
    })
    .then( (responseText) => {
      if(responseText != null && responseText!= "")
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
