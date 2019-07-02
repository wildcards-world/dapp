import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


import axios from 'axios';

export const UsdPriceContext = createContext<any>('');
export const getEtherUsdPrice = async () => {
  // fetch exchange rate.
  // https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0
  const ETHUSD = await axios.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSD');
  // todo: return -1 if URI request failed
  if (ETHUSD.hasOwnProperty('data')) {
    return parseFloat(ETHUSD.data.result.XETHZUSD.c[0]);
  } else {
    return -1;
  }
}

interface ProviderProps {
  children: any//React.Component
}

export const UsdPriceProvider: React.FunctionComponent<ProviderProps> = ({ children }) => {
  const [etherUsdPrice, setEtherUsdPrice] = useState(-1);

  useEffect(() => {
    // if the price has never been set, try to set it immediately
    if (etherUsdPrice < 0) {
      getEtherUsdPrice().then(setEtherUsdPrice)
    }

    const timer = setInterval(async () => {
      const newEtherUsdPrice = await getEtherUsdPrice();
      setEtherUsdPrice(newEtherUsdPrice)
    }, 1500);
    return () => clearInterval(timer);
  }, [etherUsdPrice]);

  return <UsdPriceContext.Provider value={etherUsdPrice}>
    {children}
  </UsdPriceContext.Provider>
};

UsdPriceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUsdPrice = () => useContext(UsdPriceContext);
