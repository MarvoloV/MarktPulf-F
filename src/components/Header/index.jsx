/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { fetchMarketFilter } from '../../store/actions/searchActionsCreator';
import { fetchMarkets } from '../../store/actions/landingPageActionsCreator';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const markets = useSelector((state) => state.landing.markets);
  // const marketsFilter = useSelector((state) => state.search.markets_filter);
  const [show, setShow] = useState(false);
  const [Search, setSearch] = useState('');
  useEffect(() => {
    dispatch(fetchMarkets());
  }, []);
  useEffect(() => {
    dispatch(fetchMarketFilter(markets, Search));
  }, [markets]);
  const { q = '' } = queryString.parse(location.search);
  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(fetchMarketFilter(markets, Search));
    navigate(`search/?q=${Search}`);
    e.target.value = '';
  };
  const handleSearch = ({ target }) => {
    setSearch(target.value);
  };
  const showMenu = () => (!show ? setShow(true) : setShow(false));
  return (
    <header>
      <nav className="search-header__nav">
        <div className="search-header__main">
          <h2 className="search-header__main-logo">MarktPul</h2>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <i
            className="search-header__main-bars fas fa-bars"
            onClick={showMenu}
            onKeyPress={showMenu}
            role="button"
            tabIndex="0"
          />
        </div>
        <div className="search-header__des__d">
          <form onSubmit={handleFilter}>
            <input
              className="search-header__des__d__input"
              type="text"
              placeholder="search for anything"
              value={Search}
              onChange={handleSearch}
            />
          </form>

          <i className="search-header__des__d__fa fas fa-search" />
        </div>
        <ul className={!show ? 'search-header__ul' : 'search-header__ul--show'}>
          <li className="search-header__li">
            <Link to="/">Inicio</Link>
          </li>
          <li className="search-header__li">
            <Link to="/register">Registro</Link>
          </li>
          <li className="search-header__li">
            <Link to="/login">Mi cuenta</Link>
          </li>
          <li className="search-header__li">
            <i className="search-header__mobile-cart fas fa-shopping-cart" />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
