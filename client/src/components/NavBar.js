import React, { Component } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';
import Scroll from './Scroll';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCart: false,
      cart: this.props.cart
    }

    this.showCart = this.showCart.bind(this);
  } 

  showCart(e) {
    this.setState({
      viewCart: !this.state.viewCart
    })
  }

  render() {
    console.log('this is state in navbar: ', this.state);
    let cartItems = this.state.cart.map(item => {
      return (
        <li className="cart-item" key={item.id}>
          <img className="item-image" src={item.image}/>
          <div className="item-info"> 
            <p>{item.itemname}</p>
            <p>{item.brand}</p>
            <p>{item.price}</p>
          </div>
          <button id="checkout" type="button" onClick={() => this.props.remove(item.id)}>x</button>
        </li>
      )
    });
    let items = <ul className="cart-items">{cartItems}</ul>

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black">
          {/* <a id='bg-logo'className="navbar-brand" href="/">TROVE</a> */}
          <NavLink id='bg-logo' exact className="navbar-brand" to='/' >
          TROVE
          </NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <NavLink exact activeClassName="active" className="nav-link" to='/men' >
                MEN
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink exact activeClassName="active" className="nav-link" to='/women' >
                WOMEN
              </NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 search-section">
              <input className="form-control mr-sm-2 input-sm" type="text" placeholder="Search"
              onChange = { (e) => {this.props.passHandleInput(e.target.value) }}></input>
              <NavLink exact activeClassName="active"  className="nav-link" to='/search'
              onClick = { () => {this.props.passSearch()}} >
                  Mark fix this :)
              </NavLink>
              {/* <i className="material-icons btn btn-outline-success  btn-sm btn-color " type="submit">search</i> */}
              {/* <button className="btn btn-outline-success my-2 my-sm-0 btn-sm nav-btn-color nav-btn-section" type="submit"
              onClick = { () => {this.search() }} ><i className="material-icons">search</i></button> */}
            </form>
            {/* Check if user logged in */}
            {!this.props.authenticated ?
              <NavLink exact activeClassName="active"  className="nav-link login" to='/login'>
              <i className="fa fa-user-o cart-icon" aria-hidden="true"></i>LOGIN / REGISTER
              </NavLink>
              :
              (
                <div className='navbar-nav'>
                  <NavLink exact activeClassName="active"  className="nav-link" to='/account' >
                  <i className="fa fa-suitcase cart-icon" aria-hidden="true"></i>ACCOUNT
                  </NavLink>
                    <a onClick={() => this.showCart()}>
                      <i className="fa fa-shopping-cart cart-icon" aria-hidden="true"></i>CART
                    </a>
                    <div className={this.state.viewCart ? "cart active" : "cart"}>
                      <Scroll>
                        {items}
                      </Scroll>
                      <div className="checkout">
                        <button className={this.state.cart.length > 0 ? "checkout-btn" : "checkout-btn-disabled"} type="button">CHECKOUT</button>
                      </div>
                    </div>
                  <NavLink exact activeClassName="active"  className="nav-link logout" to='/' onClick={() => this.props.logout()}>
                  <i className="fa fa-user cart-icon" aria-hidden="true"></i>LOGOUT
                  </NavLink>
                </div>
              )
            }
          </div>
        </nav>
    );
  }
}

export default NavBar;