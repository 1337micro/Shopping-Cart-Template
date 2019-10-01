import React from 'react';
import ReactDOM from 'react-dom';
import {CartComponent} from './Cart.js'
import {generateNavBarComponent} from './NavBar.js'
import './index.css';


class Body extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shoppingList: []
    }
  }
 
  searchComplete(results){
    
  }
  render() {
    return (
      
      <div>
        {generateNavBarComponent()}
        <CartComponent></CartComponent>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Body />,
  document.getElementById('root')
);
