import React, { useState, useContext, useRef} from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { ShopContext } from '../../context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';


export default function Navbar() {

  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);

  const menuRef = useRef(); // Create a reference to the menu, so that we can close it when we click outside of it
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible'); // toggles the visibility of the DOM element referenced by menuRef by adding or removing the CSS class 'nav-menu-visible' to/from its class list. If the class is present, it will be removed, making the element invisible. If the class is not present, it will be added, making the element visible.
    e.target.classList.toggle('open'); // toggles the visibility of the dropdown icon by adding or removing the CSS class 'open' to/from its class list. If the class is present, it will be removed, making the icon point upwards. If the class is not present, it will be added, making the icon point downwards.
  }

  return (
    <div className="navbar">

      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>

      <FontAwesomeIcon className="nav-dropdown" icon={faArrowAltCircleDown} onClick={dropdown_toggle} />

      <ul ref={menuRef} className="nav-menu"> {/* Add a reference to the menu */}
        <li onClick={()=>{setMenu("shop")}}><Link to='/' style={{ textDecoration: 'none'}}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}><Link to='mens' style={{ textDecoration: 'none'}}>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link to='womens' style={{ textDecoration: 'none'}}>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link to='kids' style={{ textDecoration: 'none'}}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>

      <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>

    </div>
  )
}
