"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
function NavBarItem(name, iconUrl){
    this.name = name;
    this.iconUrl = iconUrl;
}
class NavBarComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.state.navBarItems = props.navBarItems || []
    }
    componentDidMount(){
      console.log("Item mounted")
    }
    renderNavBarItem(navBarItem){
        return (
        <span class="">
            
            <img src={navBarItem.iconUrl}></img>{navBarItem.name} 
            
            
        </span>)
    }
    render() {
      return (
          <nav class="navBarBackgroundColor ">
            {this.state.navBarItems.map((navBarItem)=>{
                return this.renderNavBarItem(navBarItem)
            })}
          </nav>
          
      );
    }
  }




  const defaultNavBarItems = [new NavBarItem("My Cart", "shopping-cart-24.png")]
  function generateNavBarComponent(navBarItems = defaultNavBarItems)
  {
      return (<NavBarComponent navBarItems ={navBarItems} />)
  }
export {generateNavBarComponent};