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
    handleNavBarItemPressed(navBarItem)
    {
      this.props.onNavChange(navBarItem)
    }
    renderNavBarItem(navBarItem, key){
        return (
        <span className="navBarItemPaddingRight" key={key}>
        <button onClick={this.handleNavBarItemPressed.bind(this, navBarItem)}>            
            <img src={navBarItem.iconUrl}></img>{navBarItem.name}
        </button>
        </span>
        )
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




  const defaultNavBarItems = [new NavBarItem("My Cart", "shopping-cart-24.png"),
  new NavBarItem("Shop", "shopping-bag-24.png")]

export {NavBarComponent, defaultNavBarItems};