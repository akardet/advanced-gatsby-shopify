import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FaShoppingCart } from "react-icons/fa"
import "../style.scss"
import { StoreContext } from "../context/StoreContext"
import logo from "../images/logo.svg"
import Cart from "./Cart/Cart"

const Header = ({ siteTitle }) => {
  const { addProductToCart, client } = useContext(StoreContext)
  return (
    <header
      className="navbar"
      style={{ background: "var(--purp)", boxShadow: "var(--elevation-2)" }}
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img
            style={{ height: 60, maxHeight: "none", marginBottom: 0 }}
            src={logo}
            alt="Level Up Logo"
          />
        </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <FaShoppingCart
            onClick={addProductToCart}
            style={{ color: "white", height: 30, width: 30 }}
          />
        </div>
      </div>
      <Cart />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
