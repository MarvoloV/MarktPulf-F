/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FaRegTimesCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChooseMarket = ({ setFormProduct }) => {
  const [marketsSelected, setMarketsSelected] = useState([]);
  const [userMarkets, setUserMarkets] = useState([]);
  const user = useSelector((state) => state.user.user);
  console.log('🚀 ~ file: index.jsx ~ line 12 ~ ChooseMarket ~ user', user);
  const markets = useSelector((state) => state.productAndMarket.markets.items);
  console.log(
    '🚀 ~ file: index.jsx ~ line 13 ~ ChooseMarket ~ markets',
    markets,
  );

  useEffect(() => {
    for (const market of markets) {
      for (const marketUser of user.marketId) {
        if (market._id === marketUser) {
          setUserMarkets((userMarkets) => [...userMarkets, market]);
        }
      }
    }
  }, [markets]);

  const showMarkets = (e) => {
    const { value } = e.target;
    for (const marketSelected of marketsSelected) {
      if (marketSelected.title === value) {
        return;
      }
    }

    for (const userMarket of userMarkets) {
      if (userMarket.title === value) {
        setFormProduct((formProduct) => ({
          ...formProduct,
          marketId: [...formProduct.marketId, userMarket._id],
        }));
        setMarketsSelected([...marketsSelected, userMarket]);
      }
    }
  };
  const deleteMarket = (market) => {
    setMarketsSelected(marketsSelected.filter((m) => m !== market));
    setFormProduct((formProduct) => ({
      ...formProduct,
      marketId: formProduct.marketId.filter((m) => m !== market._id),
    }));
  };

  return (
    <>
      <div className="inputProduct__markets">
        <label className="inputProduct__markets__label" htmlFor="category">
          ¿En cual mercado quieres que este tu producto?
        </label>
        <select
          onChange={showMarkets}
          className="inputProduct__select__markets"
          id="markets"
        >
          {userMarkets.map((market) => (
            <option
              className="inputProduct__input__markets"
              value={market.title}
              selected
            >
              {market.title}
            </option>
          ))}
        </select>
      </div>
      <div className="selectedMarket">
        {marketsSelected.map((market) => (
          <div className="selectedMarket__item">
            {market.title}
            <span
              role="button"
              className="selectedMarket__span"
              onClick={() => deleteMarket(market)}
            >
              <FaRegTimesCircle className="selectedMarket__span__cancel" />
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
ChooseMarket.propTypes = {
  setFormProduct: PropTypes.string.isRequired,
};

export default ChooseMarket;
