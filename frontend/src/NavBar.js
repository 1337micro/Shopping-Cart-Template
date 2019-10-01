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
    renderNavBarItem(navBarItem, key){
        return (
        <span key={key} className="">
            
            <img src={navBarItem.iconUrl}></img>{navBarItem.name} 
            
            
        </span>)
    }
    render() {
      return (
          <nav className="navBarBackgroundColor ">
            {this.state.navBarItems.map((navBarItem, index)=>{
                return this.renderNavBarItem(navBarItem, index)
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