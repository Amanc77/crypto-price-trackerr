import React, { useContext } from 'react';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';
// Style Component
import './Navbar.css';
// Images Connections
import logo from '../../assets/logo.png';
import arrow_icon from '../../assets/arrow_icon.png';

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case 'usd': {
        setCurrency({ name: 'usd', symbol: '$' });
        break;
      }
      case 'eur': {
        setCurrency({ name: 'eur', symbol: '€' });
        break;
      }
      case 'try': {
        setCurrency({ name: 'try', symbol: '₺' });
        break;
      }
      default: {
        setCurrency({ name: 'usd', symbol: '$' });
        break;
      }
    }
  };

  return (
    <div className="navbar">
      <Link to={'/'}>
        <img className="logo" src={logo} alt="" />
      </Link>

      <ul>
        <Link to={'/'}>
          <li>Home</li>
        </Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="try">TRY</option>
        </select>

        <button>
          Sign Up <img src={arrow_icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
